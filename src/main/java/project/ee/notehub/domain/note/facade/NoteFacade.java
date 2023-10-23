package project.ee.notehub.domain.note.facade;

import lombok.RequiredArgsConstructor;
import lombok.experimental.Delegate;
import org.springframework.stereotype.Component;
import project.ee.notehub.domain.note.data.NoteService;

@Component
@RequiredArgsConstructor
public class NoteFacade {

	@Delegate
	private final NoteService noteService;
}
