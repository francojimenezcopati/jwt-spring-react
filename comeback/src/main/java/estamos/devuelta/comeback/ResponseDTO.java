package estamos.devuelta.comeback;

import org.springframework.http.HttpStatus;

public record ResponseDTO(
		boolean success,
		String message,
		Object content,
		HttpStatus status
) {
}
