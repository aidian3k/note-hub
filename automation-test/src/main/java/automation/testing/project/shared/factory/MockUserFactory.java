package automation.testing.project.shared.factory;

import automation.testing.project.shared.domain.User;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class MockUserFactory {

	public static User getMockUser() {
		return User
			.builder()
			.email("some-email@wp.pl")
			.name("adrian")
			.password("sample-password")
			.birthdayDate(LocalDate.of(2002, 7, 16))
			.username("sample-username")
			.name("adrian")
			.build();
	}
}
