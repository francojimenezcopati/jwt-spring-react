package estamos.devuelta.comeback.auth.config.jwt;

import estamos.devuelta.comeback.appuser.AppUser;
import estamos.devuelta.comeback.auth.config.token.Token;
import estamos.devuelta.comeback.auth.config.token.TokenRepository;
import estamos.devuelta.comeback.auth.config.token.TokenType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JwtService {
	private final TokenRepository tokenRepository;
	@Value("${security.jwt.secret}")
	private String secretKey;
	@Value("${security.jwt.expiration.ms}")
	private String accessTokenExpirationMs;
	@Value("${security.jwt.refresh.expiration.ms}")
	private String refreshTokenExpirationMs;

	public String generateToken(AppUser user) {
		return buildToken(user, this.accessTokenExpirationMs);
	}

	public String generateRefreshToken(AppUser user) {
		return buildToken(user, this.refreshTokenExpirationMs);
	}

	private String buildToken(AppUser user, String expirationMs) {
		return Jwts.builder()
				.id(user.getId().toString()) // TOTALMENTE OPCIONAL
				.claims(Map.of("name", user.getFirstName())) // TOTALMENTE OPCIONAL, info extra de pana
				.subject(user.getEmail())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + Integer.parseInt(expirationMs)))
				.signWith(this.getSigningKey())
				.compact();
	}

	private SecretKey getSigningKey() {
		byte[] KeyBytes = Decoders.BASE64.decode(this.secretKey);
		return Keys.hmacShaKeyFor(KeyBytes);
	}

	// para extraer el Email del token, primero tenemos que poder extraer los claims (ya que el subject/email esta en
	// la parte de claims)
	public String extractEmail(String accessToken) {
		return extractAllClaims(accessToken).getSubject();
	}

	// extrae todos los claims, despues, podes acceder al que quieras
	private Claims extractAllClaims(String token) {
		try {
			return Jwts.parser()
					.verifyWith(getSigningKey())
					.build()
					.parseSignedClaims(token)
					.getPayload();
		} catch (Exception e) {
			throw new AuthenticationException("Invalid token") {
			};
		}
	}

	// para validar el token, chequeo que el email coincida (esta parte no la entiendo xq creo que sacan al usuario
	// del mismo lado), y tambien chequeo que el token no este expirado. Aparte obviamente de chequear la signature
	// que se hace al extraer los claims.
	// Tambien chequeo que el token sea de tipo access, ya que este es el que se usa para acceder a los enpoints.
	public boolean isTokenValid(String accessToken, UserDetails userDetails) {
		final String userEmail = extractEmail(accessToken);
		final boolean isTokenOfTypeAccess = this.getTokenObjectByTokenStr(accessToken)
				.getTokenType()
				.equals(TokenType.ACCESS);
		final boolean isTokenRevoked = this.isTokenRevoked(accessToken);
		return (userEmail.equals(userDetails.getUsername()) && !isTokenExpired(
				accessToken) && isTokenOfTypeAccess && !isTokenRevoked);
	}

	public boolean isRefreshTokenValid(String refreshToken) {
		final boolean isTokenOfTypeRefresh = this.getTokenObjectByTokenStr(refreshToken)
				.getTokenType()
				.equals(TokenType.REFRESH);
		final boolean isTokenRevoked = this.isTokenRevoked(refreshToken);
		return !isTokenExpired(refreshToken) && isTokenOfTypeRefresh && !isTokenRevoked;
	}

	private boolean isTokenExpired(String token) {
		// saco el expirationDate de los claims y chequeo si la fecha es anterior a la actual (significaria que expiró)
		return extractAllClaims(token).getExpiration().before(new Date());
	}

	private boolean isTokenRevoked(String token) {
		return getTokenObjectByTokenStr(token).isRevoked();
	}

	private Token getTokenObjectByTokenStr(String token) {
		return tokenRepository.findByToken(token).orElseThrow(() -> new AuthenticationException("Invalid Token") {
		});
	}
}
