package project.ee.keycloakinitializer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan(
	basePackages = "project.ee.keycloakinitializer.configuration.properties"
)
public class KeycloakInitializerApplication {

	public static void main(String[] args) {
		SpringApplication.run(KeycloakInitializerApplication.class, args);
	}
}
