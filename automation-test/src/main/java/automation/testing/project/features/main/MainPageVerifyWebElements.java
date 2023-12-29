package automation.testing.project.features.main;

import java.util.List;
import lombok.Getter;
import lombok.experimental.Accessors;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

@Getter
@Accessors(fluent = true)
public class MainPageVerifyWebElements {

	public MainPageVerifyWebElements(WebDriver webDriver) {
		PageFactory.initElements(webDriver, this);
	}

	@FindBy(xpath = "//mat-dialog-content/div/div/p/span")
	private List<WebElement> profileInformation;

	@FindBy(xpath = "//app-note/div/div[2]/span")
	private WebElement noteUpdateDate;

	@FindBy(xpath = "//app-note-read/div[3]/div/p")
	private WebElement noteDialogContent;

	@FindBy(xpath = "//app-note-read/div[1]/p")
	private WebElement noteDialogTitle;

	@FindBy(xpath = "//app-about-us/mat-dialog-content/p[1]")
	private WebElement firstParagraphOfAboutUsDialog;

	@FindBy(xpath = "//app-contact-us//a")
	private List<WebElement> contactUsInformation;

	@FindBy(xpath = "//app-note//p[1]")
	private List<WebElement> notesTitles;

	@FindBy(xpath = "//mat-error")
	private List<WebElement> noteCreationErrors;

	@FindBy(xpath = "//mat-dialog-actions/button")
	private WebElement createNoteDialogButton;
}
