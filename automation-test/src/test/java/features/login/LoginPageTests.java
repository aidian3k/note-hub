package features.login;

import automation.testing.project.features.login.LoginPage;
import automation.testing.project.features.register.RegisterPageActController;
import automation.testing.project.shared.tools.RandomEmailGenerator;
import automation.testing.project.shared.domain.User;
import features.ApplicationEndpoints;
import features.BasicSeleniumTest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.chrome.ChromeDriver;

import java.time.LocalDate;
import java.util.concurrent.TimeUnit;

class LoginPageTests extends BasicSeleniumTest {

	private LoginPage loginPage;

	@BeforeEach
	void setUpLoginPage() {
		this.webDriver = new ChromeDriver(chromeOptions);
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
	void shouldDisplayErrorMessageWhenUserDoesNotEnterEmail()
		throws InterruptedException {
		loginPage
			.act()
			.sendUserName("")
			.clickSubmitButton()
			.verify()
			.verifyThatUserNameIsNotEntered();
	}

	@Test
	void shouldDisplayErrorMessageWhenUserDoesNotEnterPassword()
		throws InterruptedException {
		loginPage
			.act()
			.sendPassword("")
			.clickSubmitButton()
			.verify()
			.verifyThatPasswordIsNotEntered();
	}

	@Test
	void shouldLoginUserProperlyWhenUserExist() throws InterruptedException {
		// given sample user
		String sampleEmail = RandomEmailGenerator.generateRandomEmail();
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

		registerPageActController.registerUser(user).submitRegistration();
		webDriver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);

		loginPage
			.act()
			.sendUserName(sampleEmail)
			.sendPassword(samplePassword)
			.clickSubmitButton();

		// then webdriver should not be on login page
		Thread.sleep(1000);
		Assertions.assertThat(webDriver.getCurrentUrl()).doesNotContain("login");
	}
}
