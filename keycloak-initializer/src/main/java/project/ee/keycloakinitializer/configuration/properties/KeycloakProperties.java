package project.ee.keycloakinitializer.configuration.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties("keycloak-initializer")
@Getter
@Setter
public class KeycloakProperties {

	private String realmName;
	private String clientId;
	private String userName;
	private String password;
	private String serverUrl;
}
