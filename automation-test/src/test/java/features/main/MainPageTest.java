package features.main;

import automation.testing.project.features.main.MainPage;
import automation.testing.project.shared.domain.Note;
import automation.testing.project.shared.domain.User;
import automation.testing.project.shared.tools.LoginTestTools;
import features.ApplicationEndpoints;
import features.BasicSeleniumTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.chrome.ChromeDriver;

class MainPageTest extends BasicSeleniumTest {

	private User user;
	private MainPage mainPage;

	@BeforeEach
	void setUpLoginPage() {
		this.webDriver = new ChromeDriver(chromeOptions);
		webDriver.navigate().to(ApplicationEndpoints.LOGIN_URL);
		LoginTestTools loginTestTools = new LoginTestTools(webDriver);
		this.user = loginTestTools.createUserAndLoginIntoPage();
		this.mainPage = new MainPage(webDriver);
	}

	@Test
	void shouldEnterTheProfileDialogAndDisplayProfileInformationWhenUserClicksProfileButton() {
		mainPage
			.act()
			.clickProfileButton()
			.then()
			.verify()
			.verifyThatProfileDialogInfoMatchesUserInfo(user);
	}

	@Test
	void shouldEnterTheAboutUsPageAndDisplayInformationWhenUserClicksAboutUsButton() {
		mainPage
			.act()
			.clickAboutUsButton()
			.then()
			.verify()
			.verifyThatValidAboutUsContentIsDisplayed();
	}

	@Test
	void shouldEnterContactUsPageAndDisplayInformationWhenUserClicksContactUsButton() {
		mainPage
			.act()
			.clickContactUsButton()
			.then()
			.verify()
			.verifyThatValidContactUsInformationIsDisplayed();
	}

	@Test
	void shouldCorrectlyLogoutUserWhenUserClicksTheLogoutButton()
		throws InterruptedException {
		mainPage
			.act()
			.clickLogoutButton()
			.then()
			.verify()
			.verifyThatUserHasLogout();
	}

	@Test
	void shouldCorrectlyAddNewNoteWhenUserWantsToAddNewNote() {
		// given note to be created
		Note note = Note
			.builder()
			.title("some-title")
			.content("some-content")
			.build();

		mainPage
			.act()
			.clickCreateNoteButton()
			.createNote(note)
			.then()
			.verify()
			.verifyThatNoteHasBeenAdded(note);
	}

	@Test
	void shouldCorrectlyDeleteAddedNoteWhenUserWantsToDeleteTheNote() {
		// Firstly creating the note and then trying to remove
		Note note = Note
			.builder()
			.title("note-to-remove")
			.content("note-to-remove")
			.build();

		mainPage
			.act()
			.createNote(note)
			.then()
			.verify()
			.verifyThatNoteHasBeenAdded(note)
			.then()
			.act()
			.clickDeleteButton()
			.then()
			.verify()
			.verifyThatNoteHasBeenDeleted(note);
	}

	@Test
	void shouldCorrectlyEditAddedNoteWhenUserWantsToEditTheNote() {
		// Firstly we have to create the note and then remove
		Note note = Note
			.builder()
			.title("note-to-edit")
			.content("note-to-edit")
			.build();

		Note editedNote = note.toBuilder().title("edited-title").build();

		mainPage
			.act()
			.createNote(note)
			.then()
			.verify()
			.verifyThatNoteHasBeenAdded(note)
			.then()
			.act()
			.clickReadMoreButton()
			.clickEditNoteModalButton()
			.createNote(editedNote)
			.then()
			.verify()
			.verifyThatNoteHasBeenAdded(editedNote);
	}

	@Test
	void shouldDisplayWholeContentWhenUserWantsToReadMoreFromNote() {
		Note note = Note
			.builder()
			.title("some-title")
			.content("this is sample-content right here")
			.build();

		mainPage
			.act()
			.createNote(note)
			.clickReadMoreButton()
			.then()
			.verify()
			.verifyThatReadMoreModalHasValidNoteInformation(note);
	}

	@Test
	void shouldVerifyMandatoryFieldsWhenUserDoesNotEnterMandatoryFieldsDuringTheCreation() {
		mainPage
			.act()
			.clickCreateNoteButton()
			.clickNoteCreationMandatoryFields()
			.then()
			.verify()
			.verifyThatButtonIsDisabledAndErrorMessagesDisplayed();
	}

	@Test
	void shouldCorrectlyFindNoteByTitleWhenUserEntersValidTitleInTheSearch() {
		// Creating note to search
		Note noteToSearch = Note
			.builder()
			.title("search-title")
			.content("search-content")
			.build();

		mainPage
			.act()
			.createMultipleNotes(noteToSearch)
			.sendKeysToSearchAndPressEnter(noteToSearch.getTitle())
			.then()
			.verify()
			.verifyThatNoteHasBeenDeleted(noteToSearch);
	}

	@Test
	void shouldFindZeroNotesWhenNotesAreNotAddedToTheUser() {
		mainPage
			.act()
			.sendKeysToSearchAndPressEnter("")
			.then()
			.verify()
			.verifyThatNoNoteIsDisplayedOnTheScreen();
	}
}
