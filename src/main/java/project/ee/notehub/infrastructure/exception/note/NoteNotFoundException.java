package project.ee.notehub.infrastructure.exception.note;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class NoteNotFoundException extends RuntimeException {

	public NoteNotFoundException(String message) {
		super(message);
	}
}
