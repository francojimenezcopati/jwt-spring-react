package estamos.devuelta.comeback.auth.config.token;

public record TokenResponseDTO(
		String accessToken,
		String refreshToken
) {
}
