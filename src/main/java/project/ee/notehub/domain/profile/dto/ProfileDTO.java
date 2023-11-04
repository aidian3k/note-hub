package project.ee.notehub.domain.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Jacksonized
public class ProfileDTO {

	private String email;
	private String name;
	private String username;
	private int numberOfNotes;
}
