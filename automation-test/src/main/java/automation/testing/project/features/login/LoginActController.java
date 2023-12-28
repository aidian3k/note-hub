package automation.testing.project.features.login;

import lombok.Getter;
import org.openqa.selenium.WebDriver;

@Getter
public class LoginActController {

	private final WebDriver webDriver;
	private final LoginActWebElements loginActWebElements;

	public LoginActController(WebDriver webDriver) {
		this.webDriver = webDriver;
		this.loginActWebElements = new LoginActWebElements(webDriver);
	}

	public LoginActController sendUserName(String username) {
		loginActWebElements.emailInput().sendKeys(username);

		return this;
	}

	public LoginActController sendPassword(String password) {
		loginActWebElements.passwordInput().sendKeys(password);

		return this;
	}

	public LoginPage clickSubmitButton() {
		loginActWebElements.loginButton().click();

		return LoginPage.getLoginPage(webDriver);
	}
}
