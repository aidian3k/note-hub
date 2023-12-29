package automation.testing.project.features.main;

import static org.assertj.core.api.Assertions.*;

import automation.testing.project.shared.domain.Note;
import automation.testing.project.shared.domain.User;
import automation.testing.project.shared.tools.WebDriverTools;
import java.util.List;
import java.util.Set;
import org.assertj.core.api.Assertions;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class MainPageVerifyController {

	private WebDriver webDriver;
	private final MainPageVerifyWebElements mainPageVerifyWebElements;

	public MainPageVerifyController(WebDriver webDriver) {
		this.webDriver = webDriver;
		this.mainPageVerifyWebElements = new MainPageVerifyWebElements(webDriver);
	}

	public MainPageVerifyController verifyThatProfileDialogInfoMatchesUserInfo(
		User user
	) {
		WebDriverTools.makeProgramWait(1);

		List<String> profileSpanInformation = mainPageVerifyWebElements
			.profileInformation()
			.stream()
			.map(WebElement::getText)
			.toList();

		Set<String> userInformationToDisplay = Set.of(
			String.format("'%s'", user.getEmail()),
			String.format("'%s'", user.getName())
		);

		assertThat(profileSpanInformation).containsAll(userInformationToDisplay);

		return this;
	}

	public MainPageVerifyController verifyThatValidAboutUsContentIsDisplayed() {
		final String firstParagraphContent =
			"Welcome to our notes app! We're passionate about helping you stay organized, capture your thoughts, and make life a little bit easier. Our mission is to provide you with a user-friendly platform that enhances your productivity and creativity.";
		assertThat(
			mainPageVerifyWebElements.firstParagraphOfAboutUsDialog().getText()
		)
			.isEqualTo(firstParagraphContent);

		return this;
	}

	public MainPageVerifyController verifyThatValidContactUsInformationIsDisplayed() {
		WebDriverTools.makeProgramWait(1);

		final Set<String> contactUsInformation = Set.of(
			"+48 728-221-243",
			"adrian.nowosielski1@gmail.com",
			"Warsaw"
		);
		final List<String> dialogContactInfo = mainPageVerifyWebElements
			.contactUsInformation()
			.stream()
			.map(WebElement::getText)
			.toList();

		assertThat(dialogContactInfo)
			.containsExactlyInAnyOrderElementsOf(contactUsInformation);

		return this;
	}

	public MainPageVerifyController verifyThatUserHasLogout()
		throws InterruptedException {
		Thread.sleep(1000);
		JavascriptExecutor js = (JavascriptExecutor) webDriver;
		String key = "accessToken";
		String accessTokenValue = (String) js.executeScript(
			"return localStorage.getItem(arguments[0]);",
			key
		);

		assertThat(webDriver.getCurrentUrl()).contains("login");
		assertThat(accessTokenValue).isNull();

		return this;
	}

	public MainPageVerifyController verifyThatNoteHasBeenAdded(Note note) {
		WebDriverTools.makeProgramWait(1);

		List<String> addedNotesTitles = mainPageVerifyWebElements
			.notesTitles()
			.stream()
			.map(WebElement::getText)
			.toList();

		assertThat(addedNotesTitles).contains(note.getTitle());

		return this;
	}

	public MainPage then() {
		return MainPage.getMainPage(webDriver);
	}

	public MainPageVerifyController verifyThatNoteHasBeenDeleted(Note note) {
		WebDriverTools.makeProgramWait(1);

		List<String> addedNotesTitles = mainPageVerifyWebElements
			.notesTitles()
			.stream()
			.map(WebElement::getText)
			.toList();

		assertThat(addedNotesTitles).doesNotContain(note.getTitle());

		return this;
	}

	public MainPageVerifyController verifyThatReadMoreModalHasValidNoteInformation(
		Note note
	) {
		WebDriverTools.makeProgramWait(1);

		assertThat(mainPageVerifyWebElements.noteDialogTitle().getText())
			.isEqualTo(note.getTitle());
		assertThat(mainPageVerifyWebElements.noteDialogContent().getText())
			.isEqualTo(note.getContent());

		return this;
	}

	public MainPageVerifyController verifyThatButtonIsDisabledAndErrorMessagesDisplayed() {
		final String errorMessage = "This field is required";
		final int expectedSize = 2;

		assertThat(
			mainPageVerifyWebElements
				.noteCreationErrors()
				.stream()
				.map(WebElement::getText)
				.toList()
		)
			.hasSize(expectedSize)
			.contains(errorMessage);

		assertThat(mainPageVerifyWebElements.createNoteDialogButton().isEnabled())
			.isFalse();

		return this;
	}

	public MainPageVerifyController verifyThatNoNoteIsDisplayedOnTheScreen() {
		final int expectedSize = 0;

		List<String> addedNotesTitles = mainPageVerifyWebElements
			.notesTitles()
			.stream()
			.map(WebElement::getText)
			.toList();

		assertThat(addedNotesTitles).hasSize(expectedSize);

		return this;
	}
}
