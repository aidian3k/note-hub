package automation.testing.project.features.login;

import lombok.Getter;
import lombok.experimental.Accessors;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

@Accessors(fluent = true)
@Getter
class LoginActWebElements {

	private WebDriver webDriver;

	public LoginActWebElements(WebDriver webDriver) {
		PageFactory.initElements(webDriver, this);
	}

	@FindBy(xpath = "//app-login//mat-form-field[1]//input")
	private WebElement emailInput;

	@FindBy(xpath = "//app-login//mat-form-field[2]//input")
	private WebElement passwordInput;

	@FindBy(xpath = "//app-login//button")
	private WebElement loginButton;
}
