package estamos.devuelta.comeback.Task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
	Optional<Task> findTaskByTitle(String title); // este es un metodo propio, por ejemplo
}
