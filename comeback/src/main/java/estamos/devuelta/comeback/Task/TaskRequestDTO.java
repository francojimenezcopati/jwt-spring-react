package estamos.devuelta.comeback.Task;

import java.util.List;

public record TaskRequestDTO(String title, String description, boolean done, List<String> categories) {
}
