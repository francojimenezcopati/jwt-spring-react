package estamos.devuelta.comeback.appuser;

public record AppUserDTO(
		Long id,
		String firstName,
		String lastName,
		String email,
		AppUserRole role
) {
}

