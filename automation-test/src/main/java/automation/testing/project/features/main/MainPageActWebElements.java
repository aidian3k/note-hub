package automation.testing.project.features.main;

import lombok.Getter;
import lombok.experimental.Accessors;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

@Getter
@Accessors(fluent = true)
public class MainPageActWebElements {

	public MainPageActWebElements(WebDriver webDriver) {
		PageFactory.initElements(webDriver, this);
	}

	@FindBy(xpath = "//app-home/div/nav/div/div/div/app-navbar-button[1]/button")
	private WebElement profileButton;

	@FindBy(xpath = "//app-home/div/nav/div/div/div/app-navbar-button[2]/button")
	private WebElement createNoteButton;

	@FindBy(xpath = "//app-home/div/nav/div/div/div/app-navbar-button[3]/button")
	private WebElement logoutButton;

	@FindBy(xpath = "//app-home/div/div/div[2]/button[1]")
	private WebElement aboutUsButton;

	@FindBy(xpath = "//app-home/div/div/div[2]/button[2]")
	private WebElement contactUsButton;

	@FindBy(
		xpath = "//app-main-dashboard-page/div/div/div[1]/div/mat-form-field[1]//input"
	)
	private WebElement searchByTitleInput;

	@FindBy(xpath = "//*[@id=\"title\"]")
	private WebElement noteTitleInput;

	@FindBy(xpath = "//*[@id=\"message\"]")
	private WebElement noteContentInput;

	@FindBy(xpath = "//mat-dialog-actions/button")
	private WebElement createNoteDialogButton;

	@FindBy(xpath = "//app-note/div/div[2]/div/button[1]")
	private WebElement readMoreButton;

	@FindBy(xpath = "//app-note-read/div[1]/div/button[2]")
	private WebElement editNoteModalButton;

	@FindBy(xpath = "//app-note/div/div[2]/div/button[2]")
	private WebElement deleteNoteButton;

	@FindBy(xpath = "//mat-dialog-actions/div/button[1]")
	private WebElement deleteNoteModalButton;

	@FindBy(xpath = "//app-note-read/div[1]/p")
	private WebElement noteModalTitle;

	@FindBy(xpath = "///app-note-read/div[3]/div/p")
	private WebElement noteModalContent;
}
