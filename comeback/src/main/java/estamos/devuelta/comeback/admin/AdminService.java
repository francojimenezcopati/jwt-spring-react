package estamos.devuelta.comeback.admin;

import estamos.devuelta.comeback.ResponseDTO;
import estamos.devuelta.comeback.Task.*;
import estamos.devuelta.comeback.appuser.AppUser;
import estamos.devuelta.comeback.appuser.AppUserDTOMapper;
import estamos.devuelta.comeback.appuser.AppUserRepository;
import estamos.devuelta.comeback.auth.access.EmailValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {
	private final TaskRepository taskRepository;
	private final AppUserRepository appUserRepository;
	private final TaskDTOMapper taskDTOMapper;
	private final AppUserDTOMapper appUserDTOMapper;
	private final EmailValidator emailValidator;
	private final PasswordEncoder passwordEncoder;

	public ResponseDTO getAllTasks() {
		List<Task> tasks = this.taskRepository.findAll();

		return new ResponseDTO(true, "Tasks listed successfully", tasks.stream().map(this.taskDTOMapper).toList(),
				HttpStatus.OK);
	}

	public ResponseDTO getAllUsers() {
		List<AppUser> appUsers = this.appUserRepository.findAll();

		return new ResponseDTO(true, "Users listed successfully",
				appUsers.stream().map(this.appUserDTOMapper).toList(),
				HttpStatus.CREATED);
	}

	public ResponseDTO registerNewUser(AdminRegisterRequestDTO adminRegisterRequestDTO) {
		boolean isValidEmail = this.emailValidator.test(adminRegisterRequestDTO.email().toLowerCase());

		if (!isValidEmail) {
			return new ResponseDTO(false, "Email not valid", null, HttpStatus.BAD_REQUEST);
		}

		AppUser appUser = new AppUser(adminRegisterRequestDTO,
				passwordEncoder.encode(adminRegisterRequestDTO.password()));
		AppUser savedUser = this.appUserRepository.save(appUser);

		return new ResponseDTO(true, "User successfully registered", this.appUserDTOMapper.apply(savedUser),
				HttpStatus.CREATED);
	}

	public ResponseDTO deleteUser(Long userId) {
		if(userId < 3)
			return new ResponseDTO(false, "You can not delete this user", null, HttpStatus.BAD_REQUEST);

		if (this.appUserRepository.findById(userId).isPresent()) {
			this.appUserRepository.deleteById(userId);
			return new ResponseDTO(true, "User deleted successfully", null, HttpStatus.OK);
		}

		return new ResponseDTO(false, "User not found with id: " + userId, null, HttpStatus.NOT_FOUND);
	}

	public ResponseDTO deleteTask(Long taskId) {
		if (this.taskRepository.findById(taskId).isPresent()) {
			this.taskRepository.deleteById(taskId);
			return new ResponseDTO(true, "Task deleted successfully", null, HttpStatus.OK);
		}

		return new ResponseDTO(false, "Task not found with id: " + taskId, null, HttpStatus.NOT_FOUND);
	}

	public ResponseDTO updateTask(Long taskId, TaskRequestDTO taskRequestDTO) {
		Optional<Task> optionalTask = this.taskRepository.findById(taskId);

		if (optionalTask.isPresent()) {
			Task taskToUpdate = optionalTask.get();
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
			return new ResponseDTO(false, "Task not found with id: " + taskId, null, HttpStatus.NOT_FOUND);
		}
	}
}
