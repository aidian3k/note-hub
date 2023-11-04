package project.ee.notehub.domain.note.mapper;

import org.springframework.stereotype.Component;
import project.ee.notehub.domain.note.dto.NoteDTO;
import project.ee.notehub.domain.note.entity.Note;

@Component
public class NoteMapper {

	public NoteDTO toDto(Note note) {
		return NoteDTO
			.builder()
			.id(note.getId())
			.title(note.getTitle())
			.content(note.getContent())
			.modificationDate(note.getModificationDate())
			.build();
	}
}
