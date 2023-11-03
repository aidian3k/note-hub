package project.ee.notehub.domain.user.data;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;
import project.ee.notehub.domain.user.data.keycloak.UserRegistrationMapper;
import project.ee.notehub.domain.user.dto.UserRegistrationRequest;
import project.ee.notehub.infrastructure.security.KeycloakProvider;

@Service
@RequiredArgsConstructor
@Slf4j
class UserRegistrationService {

	private final KeycloakProvider keycloakProvider;

	int registerKeycloakUser(UserRegistrationRequest registrationRequest) {
		UsersResource usersResource = keycloakProvider.getRealmResource().users();
		UserRepresentation userRepresentation = UserRegistrationMapper.createUserRepresentation(
			registrationRequest
		);

		return usersResource.create(userRepresentation).getStatus();
	}
}
