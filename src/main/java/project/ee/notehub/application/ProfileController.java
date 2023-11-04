package project.ee.notehub.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.ee.notehub.domain.profile.data.ProfileService;
import project.ee.notehub.domain.profile.dto.ProfileDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
class ProfileController {

	private final ProfileService profileService;

	@GetMapping("/profile")
	public ResponseEntity<ProfileDTO> getProfileInformation() {
		return new ResponseEntity<>(
			profileService.getProfileInformation(),
			HttpStatus.OK
		);
	}
}
