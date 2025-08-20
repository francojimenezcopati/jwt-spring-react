package estamos.devuelta.comeback.category;


import estamos.devuelta.comeback.Task.Task;
import estamos.devuelta.comeback.appuser.AppUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
	@Column(unique = true, nullable = false)
	private String name;

	@ManyToMany(mappedBy = "categories")
	private List<Task> tasks = new ArrayList<>();

	public Category(String name) {
		this.name = name;
	}

	public void addTask(Task task) {
		this.tasks.add(task);
		task.getCategories().add(this);
	}
}
