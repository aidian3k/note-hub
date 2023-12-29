package automation.testing.project.shared.tools;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.Random;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class RandomEmailGenerator {

	public static String generateRandomEmail() {
		String allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";
		int emailLength = 10;
		StringBuilder randomEmail = new StringBuilder();

		Random random = new Random();

		// Generate a random email address
		for (int i = 0; i < emailLength; i++) {
			int randomIndex = random.nextInt(allowedChars.length());
			char randomChar = allowedChars.charAt(randomIndex);
			randomEmail.append(randomChar);
		}

		randomEmail.append("@example.com");

		return randomEmail.toString();
	}
}
