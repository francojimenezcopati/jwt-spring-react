package estamos.devuelta.comeback.appuser;

import java.time.LocalDate;

public record AppUserDTO(
		Long id,
		String firstName,
		String lastName,
		String email,
		AppUserRole role,
		LocalDate createdAt
) {
}

