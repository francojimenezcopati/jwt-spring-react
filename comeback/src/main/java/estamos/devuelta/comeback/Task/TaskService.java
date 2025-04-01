package estamos.devuelta.comeback.Task;

import estamos.devuelta.comeback.ResponseDTO;
import estamos.devuelta.comeback.appuser.AppUser;
import estamos.devuelta.comeback.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class TaskService {
	private final TaskRepository taskRepository;
	private final TaskDTOMapper taskDTOMapper;
	private final AppUserService appUserService;

	public ResponseDTO getTasks() {
		AppUser appUser = this.obtainAuthenticatedUser();

		List<TaskDTO> tasksDTO = appUser.getTasks().stream().map(taskDTOMapper).toList();

		return new ResponseDTO(true, null, tasksDTO, HttpStatus.OK);
	}

	public ResponseDTO getTaskById(Long id) {
		AppUser appUser = this.obtainAuthenticatedUser();

		List<Task> tasks = appUser.getTasks().stream().filter(t -> t.getId().equals(id)).toList();

		if (!tasks.isEmpty()) {
			TaskDTO task = this.taskDTOMapper.apply(tasks.getFirst());
			return new ResponseDTO(true, null, task, HttpStatus.OK);
		} else {
			return new ResponseDTO(false, "Task not found with id: " + id, null, HttpStatus.NOT_FOUND);
		}
	}

	public ResponseDTO createTask(TaskRequestDTO taskRequestDTO) {
		if (this.taskRepository.findTaskByTitle(taskRequestDTO.title()).isPresent()) {
			return new ResponseDTO(false, "Title already taken", null, HttpStatus.CONFLICT);
		}

		AppUser appUser = this.obtainAuthenticatedUser();

		try {
			Task task = new Task(taskRequestDTO.title(), taskRequestDTO.description(), taskRequestDTO.done(), appUser);

			TaskDTO taskDTO = this.taskDTOMapper.apply(this.taskRepository.save(task));

			return new ResponseDTO(true, "Task created successfully", taskDTO, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseDTO(false, "An error occurred trying to save the task: " + e.getMessage(), null,
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Transactional
	public ResponseDTO deleteAllTasks() {
		AppUser appUser = this.obtainAuthenticatedUser();

		List<Task> tasks = appUser.getTasks().stream().filter(Task::isDone).toList();

		appUser.getTasks().removeAll(tasks);

		try {
			this.taskRepository.deleteAll(tasks);
			return new ResponseDTO(true, "All tasks deleted", null, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseDTO(false, "An error occurred trying to delete the tasks: " + e.getMessage(), null,
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Transactional
	public ResponseDTO updateTask(Long id, TaskRequestDTO taskRequestDTO) {
		AppUser appUser = this.obtainAuthenticatedUser();

		List<Task> tasks = appUser.getTasks().stream().filter(t -> t.getId().equals(id)).toList();

		if (!tasks.isEmpty()) {
			Task taskToUpdate = tasks.getFirst();

			taskToUpdate.setTitle(taskRequestDTO.title());
			taskToUpdate.setDescription(taskRequestDTO.description());
			taskToUpdate.setDone(taskRequestDTO.done());

			try {
				TaskDTO taskDTO = this.taskDTOMapper.apply(this.taskRepository.save(taskToUpdate));
				return new ResponseDTO(true, "Task updated successfully", taskDTO, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseDTO(false, "An error occurred trying to save the task: " + e.getMessage(), null,
						HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} else {
			return new ResponseDTO(false, "Task not found with id: " + id, null, HttpStatus.NOT_FOUND);
		}
	}

	@Transactional
	public ResponseDTO deleteTaskById(Long id) {
		AppUser appUser = this.obtainAuthenticatedUser();

		List<Task> tasks = appUser.getTasks().stream().filter(t -> t.getId().equals(id)).toList();

		if (!tasks.isEmpty()) {
			Task taskToDelete = tasks.getFirst();
			appUser.getTasks().remove(taskToDelete);
			this.taskRepository.deleteById(id);

			return new ResponseDTO(true, "Task deleted successfully", null, HttpStatus.OK);
		} else {
			return new ResponseDTO(false, "Task not found with id: " + id, null, HttpStatus.NOT_FOUND);
		}
	}

	private AppUser obtainAuthenticatedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null) {
			throw new IllegalStateException("An authenticated user must exist in the session to create tasks");
		}

		// Obtener el email del usuario autenticado
		String email = authentication.getName();

		AppUser appUser = (AppUser) this.appUserService.loadUserByUsername(email);

		return appUser;
	}

}
