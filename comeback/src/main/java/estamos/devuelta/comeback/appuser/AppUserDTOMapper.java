package estamos.devuelta.comeback.appuser;

import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class AppUserDTOMapper implements Function<AppUser, AppUserDTO> {
	@Override
	public AppUserDTO apply(AppUser appUser) {
		return new AppUserDTO(
				appUser.getId(),
				appUser.getFirstName(),
				appUser.getLastName(),
				appUser.getEmail(),
				appUser.getRole()
		);
	}
}

