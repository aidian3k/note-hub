package project.ee.notehub.application;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.ee.notehub.domain.user.data.UserFacade;
import project.ee.notehub.domain.user.dto.UserLoginRequest;
import project.ee.notehub.domain.user.dto.UserLoginResponse;
import project.ee.notehub.domain.user.dto.UserRegistrationRequest;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/auth")
class AuthenticationController {

	private final UserFacade userFacade;

	@PostMapping("/register")
	public ResponseEntity<Void> registerUser(
		@RequestBody UserRegistrationRequest userRegistrationRequest
	) {
		return new ResponseEntity<>(
			HttpStatusCode.valueOf(userFacade.registerUser(userRegistrationRequest))
		);
	}

	@PostMapping("/login")
	public ResponseEntity<UserLoginResponse> authenticateUser(
		@RequestBody UserLoginRequest userLoginRequest
	) {
		return new ResponseEntity<>(
			userFacade.authenticateUser(userLoginRequest),
			HttpStatus.OK
		);
	}

	@PostMapping("/refresh-token")
	public ResponseEntity<UserLoginResponse> handleRefreshToken(
		@RequestBody String refreshToken
	) {
		return new ResponseEntity<>(
			userFacade.handleRefreshToken(refreshToken),
			HttpStatus.OK
		);
	}

	@PostMapping("/logout")
	public ResponseEntity<Void> logoutUser(
		@NonNull HttpServletRequest request,
		@NonNull HttpServletResponse response
	) {
		this.userFacade.logoutUser(request, response);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
