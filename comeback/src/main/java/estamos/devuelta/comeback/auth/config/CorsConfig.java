package estamos.devuelta.comeback.auth.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableTransactionManagement
public class CorsConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				// para hoppscotch cuando uso su extension de chrom ------------------->  vvvvvvvvvvvvv
				.allowedOrigins("http://localhost:5173", "https://hoppscotch.io",
						"chrome-extension://amknoiejhlmhancpahfcfcfhllgkpbld")  // Reemplaza con el origen específico
				.allowedMethods("*")
				.allowCredentials(true);  // Permitir envío de credenciales
	}

//	@Override
//	public void addCorsMappings(CorsRegistry registry) {
//		registry.addMapping("/**")
//				.allowedOrigins("*")
//				.allowedMethods("*");
//	}

}


