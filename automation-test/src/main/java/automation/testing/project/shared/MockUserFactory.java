package automation.testing.project.shared;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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
