package project.ee.notehub.domain.note.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import project.ee.notehub.domain.note.dto.NoteDTO;
import project.ee.notehub.domain.note.entity.Note;

@Mapper(
	componentModel = "spring",
	unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface NoteMapper {
	NoteDTO toDto(Note note);
	Note toModel(NoteDTO noteDTO);
}
