package features.login;

import automation.testing.project.features.login.LoginPage;
import automation.testing.project.features.register.RegisterPageActController;
import automation.testing.project.shared.User;
import features.ApplicationEndpoints;
import features.BasicSeleniumTest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

class LoginPageTests extends BasicSeleniumTest {

	private LoginPage loginPage;

	@BeforeEach
	void setUpLoginPage() {
		webDriver.navigate().to(ApplicationEndpoints.LOGIN_URL);
		this.loginPage = new LoginPage(webDriver);
	}

	@Test
	void shouldNotLoginUserWhenUserDoesNotExist() {
		// given
		String userNameThatNotExist = "some-username";
		String passwordOfRandomUser = "random-user";

		// when
		loginPage
			.act()
			.sendUserName(userNameThatNotExist)
			.sendPassword(passwordOfRandomUser)
			.clickSubmitButton()
			.verify()
			.verifyThatUserIsNotLoggedIn();
	}

	@Test
	void shouldDisplayErrorMessageWhenUserDoesNotEnterEmail() {
		loginPage
			.act()
			.sendUserName("")
			.clickSubmitButton()
			.verify()
			.verifyThatUserNameIsNotEntered();
	}

	@Test
	void shouldDisplayErrorMessageWhenUserDoesNotEnterPassword() {
		loginPage
			.act()
			.sendPassword("")
			.clickSubmitButton()
			.verify()
			.verifyThatPasswordIsNotEntered();
	}

	@Test
	void shouldLoginUserProperlyWhenUserExist() {
		// given sample user
		String sampleEmail = "sample-email@wp.pl";
		String samplePassword = "sample-password";

		User user = User
			.builder()
			.email(sampleEmail)
			.birthdayDate(LocalDate.of(2002, 7, 16))
			.name("adrian")
			.username("sample-username")
			.password(samplePassword)
			.build();

		// when creating a new user and trying to log in
		webDriver.navigate().to(ApplicationEndpoints.REGISTER_URL);
		RegisterPageActController registerPageActController = new RegisterPageActController(
			webDriver
		);

		registerPageActController.registerUser(user);

		loginPage
			.act()
			.sendUserName(sampleEmail)
			.sendPassword(samplePassword)
			.clickSubmitButton();

		// then webdriver should not be on login page
		Assertions.assertThat(webDriver.getCurrentUrl()).doesNotContain("login");
	}
}
