package automation.testing.project.shared.tools;

import automation.testing.project.features.login.LoginActController;
import automation.testing.project.features.register.RegisterPageActController;
import automation.testing.project.shared.domain.User;
import automation.testing.project.shared.factory.MockUserFactory;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.WebDriver;

@RequiredArgsConstructor
public class LoginTestTools {

	private static final String REGISTER_URL = "http://localhost/register";

	private final WebDriver webDriver;

	public User createUserAndLoginIntoPage() {
		webDriver.navigate().to(REGISTER_URL);
		User user = MockUserFactory
			.getMockUser()
			.toBuilder()
			.email(RandomEmailGenerator.generateRandomEmail())
			.build();
		RegisterPageActController registerPageActController = new RegisterPageActController(
			webDriver
		);
		registerPageActController.registerUser(user).submitRegistration();

		LoginActController loginActController = new LoginActController(webDriver);
		loginActController.sendUserName(user.getEmail());
		loginActController.sendPassword(user.getPassword());
		loginActController.clickSubmitButton();

		try {
			Thread.sleep(2000);
		} catch (InterruptedException ignored) {}

		return user;
	}
}
