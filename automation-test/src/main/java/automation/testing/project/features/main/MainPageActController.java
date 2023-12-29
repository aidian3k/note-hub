package automation.testing.project.features.main;

import automation.testing.project.shared.domain.Note;
import automation.testing.project.shared.tools.WebDriverTools;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;

import java.util.stream.IntStream;

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
		WebDriverTools.makeProgramWait(1);
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
		mainPageActWebElements.createNoteDialogButton().click();

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

	public MainPageActController editNote(Note note) {
		WebDriverTools.makeProgramWait(1);
		mainPageActWebElements.noteTitleInput().clear();
		mainPageActWebElements.noteTitleInput().sendKeys(note.getTitle());
		mainPageActWebElements.noteContentInput().clear();
		mainPageActWebElements.noteContentInput().sendKeys(note.getContent());
		mainPageActWebElements.createNoteDialogButton().click();

		return this;
	}

	public MainPageActController createNote(Note note) {
		clickCreateNoteButton();
		WebDriverTools.makeProgramWait(1);

		sendNoteTitle(note.getTitle());
		sendNoteContent(note.getContent());
		mainPageActWebElements.createNoteDialogButton().click();

		return this;
	}

	public MainPage then() {
		return MainPage.getMainPage(webDriver);
	}

	public MainPageActController createMultipleNotes(Note noteToSearch, int numberOfNotes) {

		IntStream
			.range(0, numberOfNotes)
			.forEach(element -> {
				WebDriverTools.makeProgramWait(1);

				createNote(
					Note
						.builder()
						.title("title " + element)
						.content("content" + element)
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

	public MainPageActController deleteNoteFromMainScreen() {
		clickDeleteButton();
		WebDriverTools.makeProgramWait(1);
		mainPageActWebElements.confirmDeletionButton().click();

		return this;
	}
}
