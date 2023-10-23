package project.ee.keycloakinitializer.configuration.properties;

import java.util.List;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("keycloak-initializer.clients")
@Getter
@Setter
public class ClientProperties {

	private List<Client> clients;

	@Data
	public static class Client {

		private String id;
		private String redirectUrl;
	}
}
