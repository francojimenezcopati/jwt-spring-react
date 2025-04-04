package estamos.devuelta.comeback.Task;

import java.time.LocalDate;

public record TaskDTO(
		Long id,
		String title,
		String description,
		boolean done,
		LocalDate createdAt,
		String userEmail
) {
}
