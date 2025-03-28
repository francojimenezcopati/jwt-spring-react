package estamos.devuelta.comeback.auth.config.token;

import estamos.devuelta.comeback.appuser.AppUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tokens")
public class Token {
	@Id
	@GeneratedValue
	public Integer id;

	@Column(unique = true)
	public String token;
	public boolean revoked;
	public boolean expired;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "app_user_id")
	public AppUser appUser;
	@Enumerated(EnumType.STRING)
	private TokenType tokenType; // Puede ser ACCESS o REFRESH
}
