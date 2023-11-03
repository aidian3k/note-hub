package project.ee.notehub.domain.note.data;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.ast.Not;
import org.springframework.stereotype.Service;
import project.ee.notehub.domain.note.dto.CreateNoteDTO;
import project.ee.notehub.domain.note.dto.NoteDTO;
import project.ee.notehub.domain.note.entity.Note;
import project.ee.notehub.domain.note.mapper.NoteMapper;
import project.ee.notehub.domain.user.data.CurrentUserService;
import project.ee.notehub.infrastructure.exception.note.NoteNotFoundException;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoteService {

	private final NoteRepository noteRepository;
	private final CurrentUserService currentUserService;
	private final NoteMapper noteMapper;

	public List<NoteDTO> getAllNotes() {
		return noteRepository
			.findAllByUserId(currentUserService.getCurrentUserEmbeddedId())
			.stream()
			.map(noteMapper::toDto)
			.toList();
	}

	public NoteDTO getNoteById(Long noteId) {
		return noteRepository
			.findByIdAndUserId(noteId, currentUserService.getCurrentUserEmbeddedId())
			.map(noteMapper::toDto)
			.orElseThrow(() ->
				new NoteNotFoundException(
					String.format("Note with id=[%d] cannot be found", noteId)
				)
			);
	}

	public NoteDTO getNoteByTitle(String title) {
		return noteRepository
			.findByTitleAndUserId(
				title,
				currentUserService.getCurrentUserEmbeddedId()
			)
			.map(noteMapper::toDto)
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
		Note note = noteRepository
			.findByIdAndUserId(noteId, currentUserService.getCurrentUserEmbeddedId())
			.orElseThrow(() -> new NoteNotFoundException("Note has not been found!"));

		noteRepository.delete(note);
	}
}
