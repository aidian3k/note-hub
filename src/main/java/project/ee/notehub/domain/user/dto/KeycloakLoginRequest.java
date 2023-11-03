package project.ee.notehub.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class KeycloakLoginRequest {

	@Builder.Default
	private String grant_type = "password";

	@Builder.Default
	private String client_id = "backend-client";

	private String username;
	private String password;
}
