package project.ee.notehub.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class KeycloakRefreshTokenRequest {

	@Builder.Default
	private String grant_type = "refresh_token";

	@Builder.Default
	private String client_id = "backend-client";

	private String refresh_token;
}
