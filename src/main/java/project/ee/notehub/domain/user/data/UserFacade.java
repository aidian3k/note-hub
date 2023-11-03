package project.ee.notehub.domain.user.data;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import project.ee.notehub.domain.user.dto.KeycloakLoginRequest;
import project.ee.notehub.domain.user.dto.UserLoginRequest;
import project.ee.notehub.domain.user.dto.UserLoginResponse;
import project.ee.notehub.domain.user.dto.UserRegistrationRequest;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserFacade {

	private final UserRegistrationService userRegistrationService;
	private final UserLoginService userLoginService;

	public int registerUser(UserRegistrationRequest userRegistrationRequest) {
		return userRegistrationService.registerKeycloakUser(
			userRegistrationRequest
		);
	}

	public UserLoginResponse authenticateUser(UserLoginRequest userLoginRequest) {
		return userLoginService.handleUserLogin(userLoginRequest);
	}
}
