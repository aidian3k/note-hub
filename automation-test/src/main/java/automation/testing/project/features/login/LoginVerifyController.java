package automation.testing.project.features.login;

import lombok.Getter;
import org.assertj.core.api.Assertions;
import org.openqa.selenium.WebDriver;

@Getter
public class LoginVerifyController {

	private final WebDriver webDriver;
	private final LoginVerifyWebElements loginVerifyWebElements;

	public LoginVerifyController(WebDriver webDriver) {
		this.webDriver = webDriver;
		this.loginVerifyWebElements = new LoginVerifyWebElements(webDriver);
	}

	public LoginVerifyController verifyThatUserNameIsNotEntered() throws InterruptedException {
		Thread.sleep(1000);
		String expectedMessage = "Username field is required";

		Assertions
			.assertThat(loginVerifyWebElements.userNameError().getText())
			.isEqualTo(expectedMessage);

		return this;
	}

	public LoginVerifyController verifyThatPasswordIsNotEntered()
		throws InterruptedException {
		Thread.sleep(1000);
		String expectedMessage = "Password field is required";

		Assertions
			.assertThat(loginVerifyWebElements.passwordError().getText())
			.isEqualTo(expectedMessage);

		return this;
	}

	public LoginVerifyController verifyThatUserIsNotLoggedIn() {
		Assertions
			.assertThat(this.webDriver.getCurrentUrl())
			.isEqualTo("http://localhost/login");

		return this;
	}
}
