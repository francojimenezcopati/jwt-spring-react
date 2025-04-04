package estamos.devuelta.comeback.admin;

import estamos.devuelta.comeback.ResponseDTO;
import estamos.devuelta.comeback.Task.TaskRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
	private final AdminService adminService;

	@GetMapping(path = "tasks")
	public ResponseEntity<ResponseDTO> getAllTasks() {
		ResponseDTO response = this.adminService.getAllTasks();

		return new ResponseEntity<>(response, response.status());
	}

	@PutMapping(path = "tasks/{taskId}")
	public ResponseEntity<ResponseDTO> updateTask(
			@PathVariable("taskId") Long taskId, @RequestBody TaskRequestDTO taskRequestDTO
	) {
		ResponseDTO responseDTO = this.adminService.updateTask(taskId, taskRequestDTO);
		return new ResponseEntity<>(responseDTO, responseDTO.status());
	}

	@DeleteMapping(path = "tasks/{taskId}")
	public ResponseEntity<ResponseDTO> deleteTask(@PathVariable("taskId") Long taskId) {
		ResponseDTO response = this.adminService.deleteTask(taskId);

		return new ResponseEntity<>(response, response.status());
	}

	@GetMapping(path = "users")
	public ResponseEntity<ResponseDTO> getAllUsers() {
		ResponseDTO response = this.adminService.getAllUsers();

		return new ResponseEntity<>(response, response.status());
	}

	@DeleteMapping(path = "users/{userId}")
	public ResponseEntity<ResponseDTO> deleteUser(@PathVariable("userId") Long userId) {
		ResponseDTO response = this.adminService.deleteUser(userId);

		return new ResponseEntity<>(response, response.status());
	}

	@PostMapping(path = "register")
	public ResponseEntity<ResponseDTO> registerNewUser(@RequestBody AdminRegisterRequestDTO adminRegisterRequestDTO) {
		ResponseDTO response = this.adminService.registerNewUser(adminRegisterRequestDTO);

		return new ResponseEntity<>(response, response.status());
	}
}
