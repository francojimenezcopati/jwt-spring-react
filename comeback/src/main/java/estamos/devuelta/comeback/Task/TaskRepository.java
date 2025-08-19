package estamos.devuelta.comeback.Task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
	Optional<Task> findTaskByTitle(String title); // este es un metodo propio, por ejemplo

	//	@Query("SELECT Task FROM Task JOIN Task.categories c WHERE c.id = :categoryId")
	//	List<Task> findTasksByCategoryId(@Param("categoryId") Long categoryId);
}
