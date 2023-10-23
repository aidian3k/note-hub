package project.ee.keycloakinitializer.configuration.properties;

import java.util.List;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import project.ee.keycloakinitializer.domain.Role;

@ConfigurationProperties("keycloak-initializer.users")
@Getter
@Setter
public class UserProperties {

	private List<User> users;

	@Data
	public static class User {

		private String username;
		private String password;
		private List<Role> roles;

		public List<String> findAllRoles() {
			return roles.stream().map(Enum::name).toList();
		}
	}
}
