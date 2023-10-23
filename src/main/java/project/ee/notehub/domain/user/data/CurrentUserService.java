package project.ee.notehub.domain.user.data;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CurrentUserService {

	public String getCurrentUserEmbeddedId() {
		return getCurrentUserPrincipal().getSubject();
	}

	public Jwt getCurrentUserPrincipal() {
		return Optional
			.ofNullable(
				(Jwt) SecurityContextHolder
					.getContext()
					.getAuthentication()
					.getPrincipal()
			)
			.orElseThrow(() ->
				new UsernameNotFoundException("Principal could not be extracted")
			);
	}
}
