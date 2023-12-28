package automation.testing.project.features.register;

import lombok.Getter;
import lombok.experimental.Accessors;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

@Getter
@Accessors(fluent = true)
public class RegisterPageVerifyWebElements {

	private WebDriver webDriver;

	public RegisterPageVerifyWebElements(WebDriver webDriver) {
		PageFactory.initElements(webDriver, this);
	}

	@FindBy(xpath = "(//mat-error)[1]")
	private WebElement emailErrorText;

	@FindBy(xpath = "(//mat-error)[2]")
	private WebElement passwordErrorText;

	@FindBy(xpath = "//app-register/div/div/div/form/button")
	private WebElement registerButton;

	@FindBy(xpath = "//mat-dialog-container//h2")
	private WebElement registrationProblemDialogText;
}
