package estamos.devuelta.comeback.Task;

import estamos.devuelta.comeback.appuser.AppUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tasks")
public class Task {
	@Id
	@SequenceGenerator(
			name = "tasks_sequence", // estos tienen que ser iguales v
			sequenceName = "task_id_sequence",
			allocationSize = 1  // que se incrementa en 1 el id
	)
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE,
			generator = "tasks_sequence" // estos tienen que ser iguales ^
	)
	private Long id;
	private String title;
	private String description;
	private boolean done;
	private LocalDate createdAt;
	
	@ManyToOne
	private AppUser appUser;

	public Task(String title, String description, Boolean done, AppUser appUser) {
		this.title = title;
		this.description = description;
		this.done = done;
		this.createdAt = LocalDate.now();
		this.appUser = appUser;
	}
}
