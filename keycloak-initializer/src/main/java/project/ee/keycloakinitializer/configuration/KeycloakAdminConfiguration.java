package project.ee.keycloakinitializer.configuration;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.client.jaxrs.internal.ResteasyClientBuilderImpl;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import project.ee.keycloakinitializer.configuration.properties.KeycloakProperties;
import project.ee.keycloakinitializer.configuration.properties.ResteasyClientProperties;

@Component
@RequiredArgsConstructor
@Slf4j
class KeycloakAdminConfiguration {

	private final KeycloakProperties keycloakProperties;
	private final ResteasyClientProperties resteasyClientProperties;

	@Bean
	public Keycloak setUpKeyCloakAdmin() {
		return KeycloakBuilder
			.builder()
			.serverUrl(keycloakProperties.getServerUrl())
			.realm("master")
			.username(keycloakProperties.getUserName())
			.password(keycloakProperties.getPassword())
			.resteasyClient(
				new ResteasyClientBuilderImpl()
					.connectionPoolSize(resteasyClientProperties.getConnectionPoolSize())
					.connectTimeout(
						resteasyClientProperties.getConnectionTimeOut(),
						TimeUnit.MILLISECONDS
					)
					.readTimeout(
						resteasyClientProperties.getReadTimeOut(),
						TimeUnit.MILLISECONDS
					)
					.build()
			)
			.clientId(keycloakProperties.getClientId())
			.build();
	}
}
