package project.ee.notehub.domain.note.data;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import project.ee.notehub.domain.note.dto.CreateNoteDTO;
import project.ee.notehub.domain.note.dto.NoteDTO;
import project.ee.notehub.domain.note.dto.UpdateNoteDTO;
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
	private final EntityManager entityManager;

	public List<NoteDTO> getAllNotes() {
		return noteRepository
			.findAllByUserId(currentUserService.getCurrentUserEmbeddedId())
			.stream()
			.map(noteMapper::toDto)
			.sorted(Comparator.comparing(NoteDTO::getModificationDate).reversed())
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

	public List<NoteDTO> getNotesBySearchWord(String searchWord) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<NoteDTO> criteriaQuery = criteriaBuilder.createQuery(
			NoteDTO.class
		);
		Root<Note> noteRoot = criteriaQuery.from(Note.class);
		List<Predicate> predicates = new ArrayList<>();
		predicates.add(
			criteriaBuilder.equal(
				noteRoot.get("userId"),
				currentUserService.getCurrentUserEmbeddedId()
			)
		);

		if (searchWord != null) {
			predicates.add(
				criteriaBuilder.like(noteRoot.get("title"), "%" + searchWord + "%")
			);
		}

		criteriaQuery
			.select(
				criteriaBuilder.construct(
					NoteDTO.class,
					noteRoot.get("id"),
					noteRoot.get("content"),
					noteRoot.get("title"),
					noteRoot.get("modificationDate")
				)
			)
			.where(predicates.toArray(Predicate[]::new));

		List<NoteDTO> resultNoteDTOs = entityManager
			.createQuery(criteriaQuery)
			.getResultList();

		return resultNoteDTOs
			.stream()
			.sorted(Comparator.comparing(NoteDTO::getModificationDate))
			.toList();
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

	public UpdateNoteDTO updateNote(UpdateNoteDTO updateNoteDTO) {
		Note foundNote = noteRepository
			.findByIdAndUserId(
				updateNoteDTO.getId(),
				currentUserService.getCurrentUserEmbeddedId()
			)
			.orElseThrow(() -> new NoteNotFoundException("Note could not be found!"));

		Note updatedNote = foundNote
			.toBuilder()
			.title(updateNoteDTO.getTitle())
			.content(updateNoteDTO.getContent())
			.build();

		noteRepository.save(updatedNote);

		return updateNoteDTO;
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
