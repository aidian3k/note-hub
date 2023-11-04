package project.ee.notehub.domain.user.data;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import project.ee.notehub.domain.user.dto.KeycloakLoginRequest;
import project.ee.notehub.domain.user.dto.UserLoginRequest;
import project.ee.notehub.domain.user.dto.UserLoginResponse;

@Service
@RequiredArgsConstructor
@Slf4j
class UserLoginService {

	private final KeycloakLoginConnector keycloakLoginConnector;

	public UserLoginResponse handleUserLogin(UserLoginRequest userLoginRequest) {
		return keycloakLoginConnector.sendLoginRequest(
			KeycloakLoginRequest
				.builder()
				.username(userLoginRequest.getUsername())
				.password(userLoginRequest.getPassword())
				.build()
		);
	}
}
