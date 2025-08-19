package estamos.devuelta.comeback.Task;

import estamos.devuelta.comeback.category.Category;

import java.time.LocalDate;
import java.util.List;

public record TaskDTO(Long id, String title, String description, boolean done, LocalDate createdAt, String userEmail,
					  List<String> categories) {
}
