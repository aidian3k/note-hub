package automation.testing.project.features.register;

import lombok.Getter;
import lombok.experimental.Accessors;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

@Getter
@Accessors(fluent = true)
public class RegisterPageActWebElements {

	private WebDriver webDriver;

	public RegisterPageActWebElements(WebDriver webDriver) {
		PageFactory.initElements(webDriver, this);
	}

	@FindBy(
		xpath = "//app-register/div/div/div/form/div/mat-form-field[1]//input"
	)
	private WebElement emailInput;

	@FindBy(
		xpath = "//app-register/div/div/div/form/div/mat-form-field[2]//input"
	)
	private WebElement passwordInput;

	@FindBy(
		xpath = "//app-register/div/div/div/form/div/mat-form-field[3]//input"
	)
	private WebElement confirmPasswordInput;

	@FindBy(xpath = "//app-register/div/div/div/form/div/div[2]/mat-form-field//input")
	private WebElement birthDayDateInput;

	@FindBy(
		xpath = "//app-register/div/div/div/form/div/div[1]/mat-form-field[1]//input"
	)
	private WebElement userNameInput;

	@FindBy(
		xpath = "//app-register/div/div/div/form/div/div[1]/mat-form-field[2]//input"
	)
	private WebElement nameInput;

	@FindBy(xpath = "//app-register/div/div/div/form/button")
	private WebElement registerButton;
}
