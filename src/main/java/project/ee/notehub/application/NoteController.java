package project.ee.notehub.application;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import project.ee.notehub.domain.note.dto.CreateNoteDTO;
import project.ee.notehub.domain.note.dto.NoteDTO;
import project.ee.notehub.domain.note.entity.Note;
import project.ee.notehub.domain.note.facade.NoteFacade;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
class NoteController {

	private final NoteFacade noteFacade;

	@GetMapping("/note")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<NoteDTO>> getAllNotes() {
		return new ResponseEntity<>(noteFacade.getAllNotes(), HttpStatus.OK);
	}

	@GetMapping("/note/{noteId}")
	public ResponseEntity<NoteDTO> getNoteById(@PathVariable Long noteId) {
		return new ResponseEntity<>(noteFacade.getNoteById(noteId), HttpStatus.OK);
	}

	@GetMapping("/note/title")
	public ResponseEntity<NoteDTO> getNoteByTitle(@RequestParam String title) {
		return new ResponseEntity<>(
			noteFacade.getNoteByTitle(title),
			HttpStatus.OK
		);
	}

	@PostMapping("/note")
	public ResponseEntity<CreateNoteDTO> createNote(
		@RequestBody CreateNoteDTO createNoteDTO
	) {
		return new ResponseEntity<>(
			noteFacade.createNote(createNoteDTO),
			HttpStatus.CREATED
		);
	}

	@PutMapping("/note")
	public ResponseEntity<CreateNoteDTO> updateNote(
		@RequestBody CreateNoteDTO updatedNote
	) {
		return new ResponseEntity<>(
			noteFacade.updateNote(updatedNote),
			HttpStatus.OK
		);
	}

	@DeleteMapping("/note")
	public ResponseEntity<Void> deleteNote(@RequestBody Note note) {
		noteFacade.deleteNote(note);

		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/note/{noteId}")
	public ResponseEntity<Void> deleteNoteById(@PathVariable Long noteId) {
		noteFacade.deleteNoteById(noteId);

		return ResponseEntity.ok().build();
	}
}
