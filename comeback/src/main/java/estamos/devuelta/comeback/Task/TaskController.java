package estamos.devuelta.comeback.Task;

import estamos.devuelta.comeback.ResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping(path = "api/v1/tasks")
public class TaskController {
	private final TaskService taskService;
	
	@GetMapping(path = {"", "/"})
	public ResponseEntity<ResponseDTO> getTasks() {
		ResponseDTO responseDTO = this.taskService.getTasks();
		return new ResponseEntity<ResponseDTO>(responseDTO, responseDTO.status());
	}
	
	@GetMapping(path = {"{taskId}", "{taskId}/"})
	public ResponseEntity<ResponseDTO> getTaskById(@PathVariable("taskId") Long taskId) {
		ResponseDTO responseDTO = this.taskService.getTaskById(taskId);
		return new ResponseEntity<ResponseDTO>(responseDTO, responseDTO.status());
	}
	
	@PostMapping(path = {"", "/"})
	public ResponseEntity<ResponseDTO> createTask(@RequestBody TaskRequestDTO taskRequestDTO) {
		ResponseDTO responseDTO = this.taskService.createTask(taskRequestDTO);
		return new ResponseEntity<ResponseDTO>(responseDTO, responseDTO.status());
	}

	@DeleteMapping(path = "/")
	public ResponseEntity<ResponseDTO> deleteAllTasks() {
		ResponseDTO responseDTO = this.taskService.deleteAllTasks();
		return new ResponseEntity<ResponseDTO>(responseDTO, responseDTO.status());
	}

	@PutMapping(path = {"{taskId}", "{taskId}/"})
	public ResponseEntity<ResponseDTO> updateTask(@PathVariable("taskId") Long taskId, @RequestBody TaskRequestDTO taskRequestDTO) {
		ResponseDTO responseDTO = this.taskService.updateTask(taskId, taskRequestDTO);
		return new ResponseEntity<ResponseDTO>(responseDTO, responseDTO.status());
	}
	
	@DeleteMapping(path = {"{taskId}", "{taskId}/"})
	public ResponseEntity<ResponseDTO> deleteTask(@PathVariable("taskId") Long taskId) {
		ResponseDTO responseDTO = this.taskService.deleteTaskById(taskId);
		return new ResponseEntity<ResponseDTO>(responseDTO, responseDTO.status());
	}
}
