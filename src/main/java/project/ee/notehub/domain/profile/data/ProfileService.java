package project.ee.notehub.domain.profile.data;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import project.ee.notehub.domain.note.facade.NoteFacade;
import project.ee.notehub.domain.profile.dto.ProfileDTO;
import project.ee.notehub.domain.user.data.CurrentUserService;

@Service
@RequiredArgsConstructor
public class ProfileService {

	private final CurrentUserService currentUserService;
	private final NoteFacade noteFacade;

	public ProfileDTO getProfileInformation() {
		Jwt currentUserPrincipal = currentUserService.getCurrentUserPrincipal();
		return ProfileDTO
			.builder()
			.email(currentUserPrincipal.getClaimAsString("email"))
			.name(currentUserPrincipal.getClaimAsString("name"))
			.username(currentUserPrincipal.getClaimAsString("family_name"))
			.numberOfNotes(noteFacade.getAllNotes().size())
			.build();
	}
}
