package estamos.devuelta.comeback.appuser;

import estamos.devuelta.comeback.Task.Task;
import estamos.devuelta.comeback.admin.AdminRegisterRequestDTO;
import estamos.devuelta.comeback.auth.access.RegistrationRequest;
import estamos.devuelta.comeback.auth.config.token.Token;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "app_users")
public class AppUser implements UserDetails {
	@SequenceGenerator(
			name = "app_user_sequence_generator",
			sequenceName = "app_user_id_sequence",
			allocationSize = 1
	)
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE,
			generator = "app_user_sequence_generator"
	)
	@Id
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	@Enumerated(EnumType.STRING)
	private AppUserRole role;
	private boolean enabled = true;
	private boolean locked = false;
	private LocalDate createdAt;

	@OneToMany(
			mappedBy = "appUser",
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	private List<Task> tasks = new ArrayList<>();
	@OneToMany(
			mappedBy = "appUser",
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	private List<Token> tokens = new ArrayList<>();

	public AppUser(String firstName, String lastName, String email, String password, AppUserRole role) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email.toLowerCase();
		this.password = password;
		this.role = role;
		this.createdAt = LocalDate.now();
	}

	public AppUser(RegistrationRequest registrationRequest, String password, AppUserRole role) {
		this.firstName = registrationRequest.firstName();
		this.lastName = registrationRequest.lastName();
		this.email = registrationRequest.email().toLowerCase();
		this.password = password;
		this.role = role;
		this.createdAt = LocalDate.now();
	}

	public AppUser(AdminRegisterRequestDTO adminRegisterRequestDTO, String password) {
		this.firstName = adminRegisterRequestDTO.firstName();
		this.lastName = adminRegisterRequestDTO.lastName();
		this.email = adminRegisterRequestDTO.email().toLowerCase();
		this.password = password;
		this.role = adminRegisterRequestDTO.role();
		this.createdAt = LocalDate.now();
	}


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		SimpleGrantedAuthority grantedAuthority = new SimpleGrantedAuthority("ROLE_" + this.role.name());
		return Collections.singletonList(grantedAuthority);
	}


	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return !this.locked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
}
