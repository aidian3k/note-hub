package automation.testing.project.features.login;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Accessors;
import org.openqa.selenium.WebDriver;

@RequiredArgsConstructor
@Getter
@Accessors(fluent = true)
public class LoginPage {

	private final WebDriver webDriver;
	private final LoginActController act;
	private final LoginVerifyController verify;

	public LoginPage(WebDriver webDriver) {
		this.webDriver = webDriver;
		this.act = new LoginActController(webDriver);
		this.verify = new LoginVerifyController(webDriver);
	}

	public static LoginPage getLoginPage(WebDriver driver) {
		return new LoginPage(
			driver,
			new LoginActController(driver),
			new LoginVerifyController(driver)
		);
	}
}
