package project.ee.notehub.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.jackson.Jacksonized;

@Getter
@Setter
@AllArgsConstructor
@Builder
@Jacksonized
public class UserLoginRequest {

	private String username;
	private String password;
}
