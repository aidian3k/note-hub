package project.ee.keycloakinitializer.management;

import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.RealmRepresentation;
import project.ee.keycloakinitializer.configuration.properties.ClientProperties;

@RequiredArgsConstructor
@Slf4j
public class ClientManagementService {

	private final ClientProperties clientProperties;

	public void configureAuthorizationClients(
		RealmRepresentation realmRepresentation
	) {
		List<ClientRepresentation> clients = clientProperties
			.getClients()
			.stream()
			.map(client -> {
				ClientRepresentation clientRepresentation = new ClientRepresentation();
				clientRepresentation.setClientId(client.getId());
				clientRepresentation.setDirectAccessGrantsEnabled(true);
				clientRepresentation.setPublicClient(true);
				clientRepresentation.setRedirectUris(
					Collections.singletonList(client.getRedirectUrl())
				);

				return clientRepresentation;
			})
			.toList();

		realmRepresentation.setClients(clients);
	}
}
