package project.ee.notehub.infrastructure.security;

import lombok.Getter;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class KeycloakProvider {

	@Value("${keycloak.auth-server-url}")
	private String serverURL;

	@Value("${keycloak.realm}")
	private String realm;

	@Value("${keycloak.resource}")
	private String clientId;

	@Value("${keycloak.credentials.secret}")
	private String clientSecret;

	private Keycloak keycloak;

	public Keycloak getKeycloak() {
		if (keycloak == null) {
			keycloak =
				KeycloakBuilder
					.builder()
					.serverUrl(serverURL)
					.realm(realm)
					.username("admin")
					.password("admin")
					.clientId("admin-cli")
					.build();
		}

		return keycloak;
	}

	public RealmResource getRealmResource() {
		return getKeycloak().realm(realm);
	}
}
