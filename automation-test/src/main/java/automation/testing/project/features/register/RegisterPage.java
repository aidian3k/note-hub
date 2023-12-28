package automation.testing.project.features.register;

import lombok.Getter;
import lombok.experimental.Accessors;
import org.openqa.selenium.WebDriver;

@Getter
@Accessors(fluent = true)
public class RegisterPage {

	private final RegisterPageVerifyWebElements verify;
	private final RegisterPageActController act;

	public RegisterPage(WebDriver webDriver) {
		this.act = new RegisterPageActController(webDriver);
		this.verify = new RegisterPageVerifyWebElements(webDriver);
	}

	public static RegisterPage getRegisterPage(WebDriver driver) {
		return new RegisterPage(driver);
	}
}
