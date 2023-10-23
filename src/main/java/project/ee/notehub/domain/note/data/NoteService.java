package project.ee.notehub.domain.note.data;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import project.ee.notehub.domain.note.dto.CreateNoteDTO;
import project.ee.notehub.domain.note.entity.Note;
import project.ee.notehub.domain.user.data.CurrentUserService;
import project.ee.notehub.infrastructure.exception.note.NoteNotFoundException;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoteService {

	private final NoteRepository noteRepository;
	private final CurrentUserService currentUserService;

	public List<Note> getAllNotes() {
		return noteRepository.findAllByUserId(
			currentUserService.getCurrentUserEmbeddedId()
		);
	}

	public Note getNoteById(Long noteId) {
		return noteRepository
			.findByIdAndUserId(noteId, currentUserService.getCurrentUserEmbeddedId())
			.orElseThrow(() ->
				new NoteNotFoundException(
					String.format("Note with id=[%d] cannot be found", noteId)
				)
			);
	}

	public Note getNoteByTitle(String title) {
		return noteRepository
			.findByTitleAndUserId(
				title,
				currentUserService.getCurrentUserEmbeddedId()
			)
			.orElseThrow(() ->
				new NoteNotFoundException(
					String.format("Note with title=[%s] cannot be found", title)
				)
			);
	}

	public CreateNoteDTO createNote(CreateNoteDTO note) {
		Note createdNote = Note
			.builder()
			.title(note.title())
			.content(note.content())
			.userId(currentUserService.getCurrentUserEmbeddedId())
			.build();

		noteRepository.save(createdNote);

		return note;
	}

	public CreateNoteDTO updateNote(CreateNoteDTO note) {
		createNote(note);

		return note;
	}

	public void deleteNote(Note note) {
		if (
			!note.getUserId().equals(currentUserService.getCurrentUserEmbeddedId())
		) {
			throw new IllegalStateException(
				"User does not have access to this resource"
			);
		}

		noteRepository.delete(note);
	}

	public void deleteNoteById(Long noteId) {
		noteRepository.delete(getNoteById(noteId));
	}
}
