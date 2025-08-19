package estamos.devuelta.comeback.category;


import estamos.devuelta.comeback.Task.Task;
import estamos.devuelta.comeback.appuser.AppUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "categories")
public class Category {
	@SequenceGenerator(name = "category_sequence_generator", sequenceName = "category_id_sequence", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_sequence_generator")
	@Id
	private Long id;
	private String name;

	@ManyToOne
	private Task task;

	public Category(String name, Task task) {
		this.name = name;
		this.task = task;
	}
}
