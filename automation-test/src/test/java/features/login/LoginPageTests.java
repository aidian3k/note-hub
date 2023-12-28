package features.login;

import automation.testing.project.features.login.LoginPage;
import features.ApplicationEndpoints;
import features.BasicSeleniumTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LoginPageTests extends BasicSeleniumTest {

	private LoginPage loginPage;

	@BeforeEach
	void setUpLoginPage() {
		webDriver.navigate().to(ApplicationEndpoints.LOGIN_URL);
		this.loginPage = new LoginPage(webDriver);
	}

	@Test
	public void shouldNotLoginUserWhenUserDoesNotExist() {
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
	public void shouldDisplayErrorMessageWhenUserDoesNotEnterEmail() {
		loginPage
			.act()
			.sendUserName("")
			.clickSubmitButton()
			.verify()
			.verifyThatUserNameIsNotEntered();
	}

	@Test
	public void shouldDisplayErrorMessageWhenUserDoesNotEnterPassword() {
		loginPage
			.act()
			.sendPassword("")
			.clickSubmitButton()
			.verify()
			.verifyThatPasswordIsNotEntered();
	}

	@Test
	public void shouldLoginUserProperlyWhenUserExist() {}
}
