package estamos.devuelta.comeback.auth.config.token;

import estamos.devuelta.comeback.Task.Task;
import estamos.devuelta.comeback.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
	List<Token> findAllByAppUserAndExpiredFalseAndRevokedFalse(AppUser user);
	List<Token> findAllByAppUser(AppUser user);

	Optional<Token> findByToken(String refreshToken);
}
