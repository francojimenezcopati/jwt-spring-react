package estamos.devuelta.comeback.auth.access;

import estamos.devuelta.comeback.ResponseDTO;
import estamos.devuelta.comeback.appuser.*;
import estamos.devuelta.comeback.auth.config.jwt.JwtService;
import estamos.devuelta.comeback.auth.config.token.Token;
import estamos.devuelta.comeback.auth.config.token.TokenRepository;
import estamos.devuelta.comeback.auth.config.token.TokenResponseDTO;
import estamos.devuelta.comeback.auth.config.token.TokenType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AuthService {
	private final AppUserRepository appUserRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final TokenRepository tokenRepository;
	private final AuthenticationManager authenticationManager;
	private final AppUserDTOMapper appUserDTOMapper;
	private final AppUserService appUserService;
	private final EmailValidator emailValidator;

	public ResponseDTO register(RegistrationRequest registrationRequest) {
		boolean isValidEmail = this.emailValidator.test(registrationRequest.email().toLowerCase());

		if (!isValidEmail) {
			return new ResponseDTO(false, "Email not valid", null, HttpStatus.BAD_REQUEST);
		}

		AppUser appUser = new AppUser(registrationRequest,
				passwordEncoder.encode(registrationRequest.password()),
				AppUserRole.USER);
		AppUser savedUser = this.appUserRepository.save(appUser);

		return new ResponseDTO(true, "User successfully registered", this.appUserDTOMapper.apply(savedUser),
				HttpStatus.CREATED);
	}

	public ResponseDTO login(LoginRequest loginRequest) {
		try {
			// con este método .authenticate, ya se auntentica si el email y la password son correctas.
			this.authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.email().toLowerCase(),
							loginRequest.password()));

			AppUser currentUser =
					(AppUser) this.appUserService.loadUserByUsername(
							loginRequest.email().toLowerCase(Locale.ROOT));

			String accessToken = this.jwtService.generateToken(currentUser);
			String refreshToken = this.jwtService.generateRefreshToken(currentUser);

			// Revoca los tokens anteriores y guarda los nuevos
			this.revokeAllUserTokens(currentUser);
			this.saveUserToken(currentUser, accessToken, TokenType.ACCESS);
			this.saveUserToken(currentUser, refreshToken, TokenType.REFRESH);

			var token = new TokenResponseDTO(accessToken, refreshToken);

			return new ResponseDTO(true, "Logged in successfully", token, HttpStatus.OK);
		} catch (AuthenticationException authenticationException) {
			return new ResponseDTO(false, "Unauthenticated: " + authenticationException.getMessage(), null,
					HttpStatus.UNAUTHORIZED);
		}
	}

	public ResponseDTO refresh(String refreshToken) {
		// chequea que el token sea de tipo REFRESH y que no este expirado ni revocado
		if (!this.jwtService.isRefreshTokenValid(refreshToken)) {
			throw new AuthenticationException("Invalid refresh token") {
			};
		}

		String userEmail = jwtService.extractEmail(refreshToken);
		AppUser user = (AppUser) appUserService.loadUserByUsername(userEmail);

		String newAccessToken = jwtService.generateToken(user);
		String newRefreshToken = jwtService.generateRefreshToken(user);


		this.revokeAllUserTokens(user);
		this.saveUserToken(user, newAccessToken, TokenType.ACCESS);
		this.saveUserToken(user, newRefreshToken, TokenType.REFRESH);

		var token = new TokenResponseDTO(newAccessToken, newRefreshToken);

		return new ResponseDTO(true, "New token generated", token, HttpStatus.CREATED);
	}

	//
	public ResponseDTO logout(String email) {
		AppUser currentUser = (AppUser) this.appUserService.loadUserByUsername(email);
		this.revokeAllUserTokens(currentUser);
		SecurityContextHolder.clearContext();

		return new ResponseDTO(true, "Logged out successfully", null, HttpStatus.OK);
	}

	// guarda un Token en la DB para diferenciar entre ACCESS y REFRESH
	private void saveUserToken(AppUser savedUser, String accessToken, TokenType tokenType) {
		Token token =
				Token.builder()
						.appUser(savedUser)
						.expired(false)
						.revoked(false)
						.token(accessToken)
						.tokenType(tokenType)
						.build();

		this.tokenRepository.save(token);
	}

	// Encuentra todos los token que sean validos del usuario, y los invalida.
	private void revokeAllUserTokens(AppUser user) {
		List<Token> validTokens = tokenRepository.findAllByAppUserAndExpiredFalseAndRevokedFalse(user);
		if (validTokens.isEmpty()) {
			return;
		}

		validTokens.forEach(t -> {
			t.setExpired(true);
			t.setRevoked(true);
		});
		tokenRepository.saveAll(validTokens);
	}
}
