package estamos.devuelta.comeback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ComebackApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(ComebackApplication.class, args);
		
		System.out.println("\n\n\n");
		System.out.println("----------------------" + "App running" + "----------------------");
		System.out.println("\n\n\n");
	}
	
}
