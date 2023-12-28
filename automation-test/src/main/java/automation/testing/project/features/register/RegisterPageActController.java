package automation.testing.project.features.register;

import org.openqa.selenium.WebDriver;

public class RegisterPageActController {

	private final WebDriver webDriver;
	private final RegisterPageActWebElements registerPageActWebElements;

	public RegisterPageActController(WebDriver webDriver) {
		this.webDriver = webDriver;
		this.registerPageActWebElements = new RegisterPageActWebElements(webDriver);
	}
}
