package project.ee.notehub.domain.user.data;

import feign.Headers;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import project.ee.notehub.domain.user.dto.KeycloakRefreshTokenRequest;
import project.ee.notehub.domain.user.dto.UserLoginResponse;

@FeignClient(
	name = "keyCloakRefresh",
	url = "http://keycloak:8080/realms/app/protocol/openid-connect/token"
)
public interface KeycloakRefreshConnector {
	@Headers("Content-Type: application/x-www-form-urlencoded")
	@PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	UserLoginResponse handleRefreshToken(
		@RequestBody KeycloakRefreshTokenRequest keycloakRefreshTokenRequest
	);
}
