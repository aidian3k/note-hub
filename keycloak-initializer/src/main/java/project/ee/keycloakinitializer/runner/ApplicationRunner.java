package project.ee.keycloakinitializer.runner;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.RealmRepresentation;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import project.ee.keycloakinitializer.configuration.properties.ClientProperties;
import project.ee.keycloakinitializer.configuration.properties.KeycloakProperties;
import project.ee.keycloakinitializer.configuration.properties.UserProperties;
import project.ee.keycloakinitializer.management.ClientManagementService;
import project.ee.keycloakinitializer.management.RealmManagementService;
import project.ee.keycloakinitializer.management.UserManagementService;

@Component
@RequiredArgsConstructor
@Slf4j
class ApplicationRunner implements CommandLineRunner {

	private final Keycloak keycloak;
	private final KeycloakProperties keycloakProperties;
	private final ClientProperties clientProperties;
	private final UserProperties userProperties;

	public void run(String... args) {
		log.debug(
			"Starting to initialize realm with name=[{}]",
			keycloakProperties.getRealmName()
		);
		RealmRepresentation realmRepresentation = new RealmRepresentation();

		RealmManagementService realmManagementService = new RealmManagementService(
			keycloak,
			keycloakProperties
		);
		//realmManagementService.deleteAlreadyExistingRealmConfiguration();

		ClientManagementService clientManagementService = new ClientManagementService(
			clientProperties
		);
		UserManagementService userManagementService = new UserManagementService(
			userProperties,
			clientProperties
		);

		realmManagementService.configureBasicInformation(realmRepresentation);
		clientManagementService.configureAuthorizationClients(realmRepresentation);
		userManagementService.configureUsers(realmRepresentation);

		keycloak.realms().create(realmRepresentation);
	}
}
