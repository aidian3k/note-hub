package project.ee.keycloakinitializer.management;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RealmRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import project.ee.keycloakinitializer.configuration.properties.ClientProperties;
import project.ee.keycloakinitializer.configuration.properties.UserProperties;

@RequiredArgsConstructor
public class UserManagementService {

	private final UserProperties userProperties;
	private final ClientProperties clientProperties;

	public void configureUsers(RealmRepresentation realmRepresentation) {
		List<UserRepresentation> userRepresentations = userProperties
			.getUsers()
			.stream()
			.map(user -> {
				CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
				credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
				credentialRepresentation.setValue(user.getPassword());

				UserRepresentation userRepresentation = new UserRepresentation();
				userRepresentation.setUsername(user.getUsername());
				userRepresentation.setEnabled(true);
				userRepresentation.setCredentials(
					Collections.singletonList(credentialRepresentation)
				);

				Map<String, List<String>> clientRoles = clientProperties
					.getClients()
					.stream()
					.map(ClientProperties.Client::getId)
					.collect(Collectors.toMap(k -> k, v -> user.findAllRoles()));

				userRepresentation.setClientRoles(clientRoles);

				return userRepresentation;
			})
			.toList();

		realmRepresentation.setUsers(userRepresentations);
	}
}
