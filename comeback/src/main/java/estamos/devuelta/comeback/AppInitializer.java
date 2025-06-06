package estamos.devuelta.comeback;

import estamos.devuelta.comeback.Task.TaskService;
import estamos.devuelta.comeback.appuser.AppUser;
import estamos.devuelta.comeback.appuser.AppUserRepository;
import estamos.devuelta.comeback.appuser.AppUserRole;
import estamos.devuelta.comeback.auth.access.AuthService;
import estamos.devuelta.comeback.auth.access.RegistrationRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Log
//@Profile("dev")
public class AppInitializer implements CommandLineRunner {

	private final TaskService taskService;
	private final AuthService authService;
	private final PasswordEncoder passwordEncoder;
	private final AppUserRepository appUserRepository;

	@Value("${sample.data}")
	private boolean sampleData;

	@Override
	public void run(String... args) throws Exception {
		if (sampleData) {
			RegistrationRequest registrationRequest = new RegistrationRequest("Adam", "Addler", "admin@mail.com",
					"admin123");
			RegistrationRequest registrationRequest2 = new RegistrationRequest("Urijah", "Untim", "user@mail.com",
					"user123");

			AppUser appUser = new AppUser(registrationRequest,
					passwordEncoder.encode(registrationRequest.password()),
					AppUserRole.ADMIN);
			AppUser appUser2 = new AppUser(registrationRequest2,
					passwordEncoder.encode(registrationRequest2.password()),
					AppUserRole.USER);

			if (this.appUserRepository.findById(1L).isEmpty()) {
				this.appUserRepository.save(appUser);
				this.appUserRepository.save(appUser2);
			}

			System.out.println("\n\n\n");
			System.out.println("----------------------" + " mock data created " + "----------------------");
			System.out.println("\n\n\n");
		}
	}
}
