package automation.testing.project.features.login;

import lombok.Getter;
import lombok.experimental.Accessors;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

@Accessors(fluent = true)
@Getter
class LoginVerifyWebElements {

	private WebDriver webDriver;

	public LoginVerifyWebElements(WebDriver webDriver) {
		PageFactory.initElements(webDriver, this);
	}

	@FindBy(xpath = "(//app-login//mat-error)[1]")
	private WebElement userNameError;

	@FindBy(xpath = "//*[@id=\"mat-error-1\"]")
	private WebElement passwordError;
}
