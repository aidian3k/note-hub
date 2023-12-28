package automation.testing.project.features.register;

import automation.testing.project.shared.User;
import org.openqa.selenium.WebDriver;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class RegisterPageActController {

	private final WebDriver webDriver;
	private final RegisterPageActWebElements registerPageActWebElements;

	public RegisterPageActController(WebDriver webDriver) {
		this.webDriver = webDriver;
		this.registerPageActWebElements = new RegisterPageActWebElements(webDriver);
	}

	public RegisterPageActController clickEmailInput() {
		registerPageActWebElements.emailInput().click();

		return this;
	}

	public RegisterPageActController clickPasswordInput() {
		registerPageActWebElements.passwordInput().click();

		return this;
	}

	public RegisterPageActController sendEmailKeys(String keys) {
		registerPageActWebElements.emailInput().sendKeys(keys);

		return this;
	}

	public RegisterPageActController sendPasswordKeys(String keys) {
		registerPageActWebElements.passwordInput().sendKeys(keys);

		return this;
	}

	public RegisterPageActController sendConfirmPasswordKeys(String keys) {
		registerPageActWebElements.confirmPasswordInput().sendKeys(keys);

		return this;
	}

	public RegisterPageActController sendBirthdayDateKeys(String keys) {
		registerPageActWebElements.birthDayDateInput().sendKeys(keys);

		return this;
	}

	public RegisterPageActController sendUserNameAndNameAndBirthDayDateKeys(
		String username,
		String name,
		LocalDate dateOfBirth
	) {
		registerPageActWebElements.userNameInput().sendKeys(username);
		registerPageActWebElements.nameInput().sendKeys(name);
		registerPageActWebElements
			.birthDayDateInput()
			.sendKeys(dateOfBirth.format(DateTimeFormatter.ISO_DATE));

		return this;
	}

	public RegisterPage submitRegistration() {
		registerPageActWebElements.registerButton().click();

		return RegisterPage.getRegisterPage(webDriver);
	}

	public RegisterPageActController registerUser(User registerUser) {
		sendUserNameAndNameAndBirthDayDateKeys(
			registerUser.getUsername(),
			registerUser.getName(),
			registerUser.getBirthdayDate()
		);
		sendPasswordKeys(registerUser.getPassword());
		sendConfirmPasswordKeys(registerUser.getPassword());
		sendEmailKeys(registerUser.getEmail());

		return this;
	}

	public RegisterPage then() {
		return RegisterPage.getRegisterPage(webDriver);
	}
}
