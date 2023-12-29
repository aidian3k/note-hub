package automation.testing.project.features.main;

import automation.testing.project.shared.domain.Note;
import automation.testing.project.shared.tools.WebDriverTools;
import java.util.stream.IntStream;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;

public class MainPageActController {

	private WebDriver webDriver;
	private final MainPageActWebElements mainPageActWebElements;

	public MainPageActController(WebDriver webDriver) {
		this.webDriver = webDriver;
		this.mainPageActWebElements = new MainPageActWebElements(webDriver);
	}

	public MainPageActController clickDeleteButton() {
		mainPageActWebElements.deleteNoteButton().click();

		return this;
	}

	public MainPageActController clickEditNoteModalButton() {
		mainPageActWebElements.editNoteModalButton().click();

		return this;
	}

	public MainPageActController clickReadMoreButton() {
		mainPageActWebElements.readMoreButton().click();

		return this;
	}

	public MainPageActController clickProfileButton() {
		mainPageActWebElements.profileButton().click();

		return this;
	}

	public MainPageActController clickCreateNoteButton() {
		mainPageActWebElements.createNoteButton().click();

		return this;
	}

	public MainPageActController clickLogoutButton() {
		mainPageActWebElements.logoutButton().click();

		return this;
	}

	public MainPageActController clickAboutUsButton() {
		mainPageActWebElements.aboutUsButton().click();

		return this;
	}

	public MainPageActController clickContactUsButton() {
		mainPageActWebElements.contactUsButton().click();

		return this;
	}

	public MainPageActController clickNoteCreationMandatoryFields() {
		WebDriverTools.makeProgramWait(1);

		mainPageActWebElements.noteTitleInput().click();
		mainPageActWebElements.noteContentInput().click();

		return this;
	}

	public MainPageActController sendNoteTitle(String title) {
		mainPageActWebElements.noteTitleInput().sendKeys(title);

		return this;
	}

	public MainPageActController sendNoteContent(String content) {
		mainPageActWebElements.noteContentInput().sendKeys(content);

		return this;
	}

	public MainPageActController clickSubmitNote() {
		mainPageActWebElements.createNoteDialogButton().click();

		return this;
	}

	public MainPageActController createNote(Note note) {
		WebDriverTools.waitUntilElementIsClickable(
			webDriver,
			mainPageActWebElements.noteContentInput()
		);
		sendNoteTitle(note.getTitle());
		sendNoteContent(note.getContent());
		mainPageActWebElements.createNoteDialogButton().click();

		return this;
	}

	public MainPage then() {
		return MainPage.getMainPage(webDriver);
	}

	public MainPageActController createMultipleNotes(Note noteToSearch) {
		final int numberOfCreatedNotes = 3;

		IntStream
			.range(0, numberOfCreatedNotes)
			.forEach(element -> {
				WebDriverTools.makeProgramWait(1);

				createNote(
					Note
						.builder()
						.title("title " + Integer.toString(element))
						.content("content" + Integer.toString(element))
						.build()
				);
			});

		createNote(noteToSearch);

		return this;
	}

	public MainPageActController sendKeysToSearchAndPressEnter(String title) {
		WebDriverTools.makeProgramWait(1);
		mainPageActWebElements.searchByTitleInput().sendKeys(title);
		mainPageActWebElements.searchByTitleInput().sendKeys(Keys.ENTER);

		return this;
	}
}
