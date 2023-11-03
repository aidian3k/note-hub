package project.ee.notehub.domain.user.data.keycloak;

import java.util.Collections;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import project.ee.notehub.domain.user.dto.UserRegistrationRequest;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class UserRegistrationMapper {

	private static CredentialRepresentation createPasswordCredentials(
		String password
	) {
		CredentialRepresentation passwordCredentials = new CredentialRepresentation();
		passwordCredentials.setTemporary(false);
		passwordCredentials.setType(CredentialRepresentation.PASSWORD);
		passwordCredentials.setValue(password);

		return passwordCredentials;
	}

	public static UserRepresentation createUserRepresentation(
		UserRegistrationRequest registrationRequest
	) {
		CredentialRepresentation credentialRepresentation = createPasswordCredentials(
			registrationRequest.getPassword()
		);

		UserRepresentation keycloakUser = new UserRepresentation();
		keycloakUser.setUsername(registrationRequest.getEmail());
		keycloakUser.setCredentials(
			Collections.singletonList(credentialRepresentation)
		);
		keycloakUser.setFirstName(registrationRequest.getFirstName());
		keycloakUser.setLastName(registrationRequest.getLastName());
		keycloakUser.setEmail(registrationRequest.getEmail());
		keycloakUser.setEnabled(true);
		keycloakUser.setEmailVerified(false);

		return keycloakUser;
	}
}
