package estamos.devuelta.comeback.Task;

import estamos.devuelta.comeback.category.Category;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@AllArgsConstructor
@Component
public class TaskDTOMapper implements Function<Task, TaskDTO> {

	@Override
	public TaskDTO apply(Task task) {
		return new TaskDTO(
				task.getId(),
				task.getTitle(),
				task.getDescription(),
				task.isDone(),
				task.getCreatedAt(),
				task.getAppUser().getEmail(),
				task.getCategories().stream().map(Category::getName).toList()
		);
	}
}
