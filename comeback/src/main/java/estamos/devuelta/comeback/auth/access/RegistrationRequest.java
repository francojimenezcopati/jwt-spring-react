package estamos.devuelta.comeback.auth.access;

public record RegistrationRequest(
		String firstName,
		String lastName,
		String email,
		String password
) {
}
