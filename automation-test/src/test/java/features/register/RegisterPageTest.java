package features.register;

import automation.testing.project.features.register.RegisterPage;
import automation.testing.project.shared.MockUserFactory;
import automation.testing.project.shared.RandomEmailGenerator;
import automation.testing.project.shared.User;
import features.ApplicationEndpoints;
import features.BasicSeleniumTest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

class RegisterPageTest extends BasicSeleniumTest {

	private RegisterPage registerPage;

	@BeforeEach
	void setUpLoginPage() {
		webDriver.navigate().to(ApplicationEndpoints.REGISTER_URL);
		this.registerPage = new RegisterPage(webDriver);
	}

	@Test
	void shouldRegisterButtonBeDisabledWhenRegisterPasswordDoesNotMatchConfirmPassword() {
		registerPage
			.act()
			.sendEmailKeys("adrian@wp.pl")
			.sendPasswordKeys("some")
			.sendConfirmPasswordKeys("some-other")
			.sendUserNameAndNameAndBirthDayDateKeys(
				"aa",
				"aaa",
				LocalDate.of(2002, 7, 16)
			)
			.then()
			.verify()
			.verifyThatRegisterButtonIsDisabled();
	}

	@Test
	void shouldDisplayErrorsWhenUserDoesNotProvideAnyEmailAndPassword() {
		registerPage
			.act()
			.sendEmailKeys("")
			.sendPasswordKeys("")
			.sendConfirmPasswordKeys("")
			.sendUserNameAndNameAndBirthDayDateKeys(
				"aa",
				"aaa",
				LocalDate.of(2002, 7, 16)
			)
			.then()
			.verify()
			.verifyThatRegisterButtonIsDisabled()
			.verifyThatPasswordIsNotEntered()
			.verifyThatEmailIsNotEntered();
	}

	@Test
	void shouldCorrectlyCreateUserWhenProvidedDataIsCorrect() {
		// Random user
		User user = MockUserFactory
			.getMockUser()
			.toBuilder()
			.email(RandomEmailGenerator.generateRandomEmail())
			.build();

		// when creating a new user
		registerPage.act().registerUser(user).submitRegistration();

		// then Webdriver should move to other page
		Assertions.assertThat(webDriver.getCurrentUrl()).doesNotContain("register");
	}

	@Test
	void shouldRegisterButtonBeDisabledWhenRegisterDateIsNotValid() {
		// Random user
		User user = MockUserFactory
			.getMockUser()
			.toBuilder()
			.email(RandomEmailGenerator.generateRandomEmail())
			.build();

		// when sending the wrong birthday date
		registerPage
			.act()
			.registerUser(user)
			.sendBirthdayDateKeys("20021-31-21")
			.then()
			.verify()
			.verifyThatRegisterButtonIsDisabled();
	}

	@Test
	void shouldThrowAnErrorWhenTryingToCreateUserThatAlreadyExist() {
		// Random user
		User user = MockUserFactory
			.getMockUser()
			.toBuilder()
			.email(RandomEmailGenerator.generateRandomEmail())
			.build();

		// when creating the user for the first time and then creating the same user for the second time
		registerPage.act().registerUser(user);
		webDriver.navigate().to(ApplicationEndpoints.REGISTER_URL);
		registerPage.act().registerUser(user).then()
				.verify()
						.verifyDialogErrorExistence();

		// then user should stay on the same site
		Assertions.assertThat(webDriver.getCurrentUrl()).contains("register");
	}
}
