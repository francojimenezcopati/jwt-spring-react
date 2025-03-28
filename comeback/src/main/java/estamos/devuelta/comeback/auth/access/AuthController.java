package estamos.devuelta.comeback.auth.access;

import estamos.devuelta.comeback.ResponseDTO;
import estamos.devuelta.comeback.auth.config.token.RefreshTokenRequestDTO;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/v1/auth")
public class AuthController {
	private final AuthService authService;

	@PostMapping(path = "register")
	public ResponseEntity<ResponseDTO> register(@RequestBody RegistrationRequest registrationRequest) {
		ResponseDTO response = this.authService.register(registrationRequest);

		return new ResponseEntity<>(response, response.status());
	}

	@PostMapping(path = "login")
	public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequest loginRequest) {
		ResponseDTO response = this.authService.login(loginRequest);

		return new ResponseEntity<>(response, response.status());
	}

	@PostMapping(path = "refresh")
	public ResponseEntity<ResponseDTO> refreshToken(@RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO) {
		ResponseDTO response = this.authService.refresh(refreshTokenRequestDTO.refreshToken());

		return new ResponseEntity<>(response, response.status());
	}

	@PostMapping(path = "logout")
	public ResponseEntity<ResponseDTO> logout(HttpServletRequest request) {
		ResponseDTO response = this.authService.logout(request);

		return new ResponseEntity<>(response, response.status());
	}

	@GetMapping(path = "test")
	public String test() {
		return "Tested";
	}
}
