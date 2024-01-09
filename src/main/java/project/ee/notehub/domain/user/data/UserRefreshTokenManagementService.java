package project.ee.notehub.domain.user.data;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project.ee.notehub.domain.user.dto.KeycloakRefreshTokenRequest;
import project.ee.notehub.domain.user.dto.UserLoginResponse;

@Service
@RequiredArgsConstructor
public class UserRefreshTokenManagementService {

	private final KeycloakRefreshConnector keycloakRefreshConnector;

	public UserLoginResponse handleRefreshToken(String refreshToken) {
		return this.keycloakRefreshConnector.handleRefreshToken(
				KeycloakRefreshTokenRequest
					.builder()
					.refresh_token(refreshToken)
					.build()
			);
	}
}
