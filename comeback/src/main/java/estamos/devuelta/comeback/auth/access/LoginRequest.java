package estamos.devuelta.comeback.auth.access;

public record LoginRequest(
		String email,
		String password
) {
}
