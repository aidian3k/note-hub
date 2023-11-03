package project.ee.notehub.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserLoginResponse {

	private String access_token;
	private String expires_in;
	private int refresh_expires_in;
	private String refresh_token;
}
