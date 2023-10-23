package project.ee.keycloakinitializer.management;

import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.RealmRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.RolesRepresentation;
import project.ee.keycloakinitializer.configuration.properties.KeycloakProperties;
import project.ee.keycloakinitializer.domain.Role;

@RequiredArgsConstructor
@Slf4j
public final class RealmManagementService {

	private final Keycloak keycloak;
	private final KeycloakProperties keycloakProperties;

	public void deleteAlreadyExistingRealmConfiguration() {
		keycloak
			.realms()
			.findAll()
			.stream()
			.filter(realm ->
				realm.getRealm().equals(keycloakProperties.getRealmName())
			)
			.findAny()
			.ifPresent(foundRealm -> {
				log.debug(
					"Removing already existing realm configuration with name=[{}]",
					keycloakProperties.getRealmName()
				);
				keycloak.realms().realm(keycloakProperties.getRealmName()).remove();
			});
	}

	public void configureBasicInformation(
		RealmRepresentation realmRepresentation
	) {
		realmRepresentation.setRealm(keycloakProperties.getRealmName());
		realmRepresentation.setEnabled(true);
		realmRepresentation.setRegistrationAllowed(true);
		realmRepresentation.setRememberMe(true);

		setAuthorizationRoles(realmRepresentation);
	}

	private void setAuthorizationRoles(RealmRepresentation realmRepresentation) {
		List<RoleRepresentation> roleRepresentations = Arrays
			.stream(Role.values())
			.map(role -> {
				RoleRepresentation roleRepresentation = new RoleRepresentation();
				roleRepresentation.setName(role.name());

				return roleRepresentation;
			})
			.toList();

		RolesRepresentation rolesRepresentation = new RolesRepresentation();
		rolesRepresentation.setRealm(roleRepresentations);
		realmRepresentation.setRoles(rolesRepresentation);
	}
}
