package project.ee.notehub.domain.note.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateNoteDTO(
	@Size(max = 255) @NotNull String title,
	@NotNull String content
) {}
