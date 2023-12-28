package automation.testing.project.features.register;

import org.assertj.core.api.Assertions;
import org.openqa.selenium.WebDriver;

public class RegisterPageVerifyController {

	private final WebDriver webDriver;
	private final RegisterPageVerifyWebElements registerPageVerifyWebElements;

	public RegisterPageVerifyController(WebDriver webDriver) {
		this.webDriver = webDriver;
		this.registerPageVerifyWebElements =
			new RegisterPageVerifyWebElements(webDriver);
	}

	public RegisterPageVerifyController verifyThatRegisterButtonIsDisabled() {
		Assertions
			.assertThat(registerPageVerifyWebElements.registerButton().isEnabled())
			.isFalse();

		return this;
	}

	public RegisterPageVerifyController verifyThatEmailIsNotEntered() {
		String expectedMessage = "This field is required";

		Assertions
			.assertThat(registerPageVerifyWebElements.emailErrorText().getText())
			.isEqualTo(expectedMessage);

		return this;
	}

	public RegisterPageVerifyController verifyThatPasswordIsNotEntered() {
		String expectedMessage = "This field is required";

		Assertions
			.assertThat(registerPageVerifyWebElements.passwordErrorText().getText())
			.isEqualTo(expectedMessage);

		return this;
	}

	public RegisterPageVerifyController verifyDialogErrorExistence()
		throws InterruptedException {
		Thread.sleep(3000);
		Assertions
			.assertThat(
				registerPageVerifyWebElements.registrationProblemDialogText().getText()
			)
			.isEqualTo("Registration problem");

		return this;
	}
}
