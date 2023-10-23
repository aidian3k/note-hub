package project.ee.keycloakinitializer.configuration.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties("keycloak-initializer.resteasy")
@Getter
@Setter
public class ResteasyClientProperties {

	private int connectionPoolSize;
	private int connectionTimeOut;
	private int readTimeOut;
}
