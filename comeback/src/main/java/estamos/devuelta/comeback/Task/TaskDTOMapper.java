package estamos.devuelta.comeback.Task;

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
				task.getCreatedAt()
		);
	}
}
