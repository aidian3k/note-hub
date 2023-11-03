package project.ee.notehub.infrastructure.security;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

@Component
class JwtAuthenticationConverter
	implements Converter<Jwt, AbstractAuthenticationToken> {

	private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
	private static final String REALM_ACCESS = "realm_access";
	private static final String RESOURCE_ACCESS = "resource_access";
	private static final String ROLES = "roles";

	@Override
	public AbstractAuthenticationToken convert(@NonNull Jwt source) {
		Set<GrantedAuthority> authorities = Stream
			.concat(
				jwtGrantedAuthoritiesConverter.convert(source).stream(),
				extractUserRoles(source).stream()
			)
			.collect(Collectors.toSet());

		return new JwtAuthenticationToken(
			source,
			authorities,
			source.getClaim(JwtClaimNames.SUB)
		);
	}

	@SuppressWarnings("unchecked")
	private static Collection<? extends GrantedAuthority> extractUserRoles(
		Jwt source
	) {
		Map<String, Object> realmAccess = (Map<String, Object>) source
			.getClaims()
			.getOrDefault(REALM_ACCESS, Map.of());
		List<String> realmRoles = (List<String>) realmAccess.getOrDefault(
			ROLES,
			Collections.emptyList()
		);

		Map<String, Object> resourceAccess = (Map<String, Object>) source
			.getClaims()
			.getOrDefault(RESOURCE_ACCESS, Map.of());
		List<String> resourceRoles =
			(
				(List<String>) (
					(Map<String, Object>) resourceAccess.getOrDefault(
						"backend-client",
						Map.of()
					)
				).getOrDefault(ROLES, Collections.emptyList())
			);

		return Stream
			.concat(realmRoles.stream(), resourceRoles.stream())
			.map(role -> new SimpleGrantedAuthority("ROLE_" + role))
			.collect(Collectors.toSet());
	}
}
