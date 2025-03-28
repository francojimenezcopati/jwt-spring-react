package estamos.devuelta.comeback.admin;

import estamos.devuelta.comeback.appuser.AppUserRole;

public record AdminRegisterRequestDTO(
		String firstName,
		String lastName,
		String email,
		String password,
		AppUserRole role
) {
}
