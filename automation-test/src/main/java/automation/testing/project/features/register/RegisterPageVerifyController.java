package automation.testing.project.features.register;

import org.openqa.selenium.WebDriver;

public class RegisterPageVerifyController {

	private final WebDriver webDriver;
	private final RegisterPageVerifyWebElements registerPageVerifyWebElements;

	public RegisterPageVerifyController(WebDriver webDriver) {
		this.webDriver = webDriver;
		this.registerPageVerifyWebElements =
			new RegisterPageVerifyWebElements(webDriver);
	}
}
