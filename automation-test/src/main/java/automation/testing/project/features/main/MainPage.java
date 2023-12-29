package automation.testing.project.features.main;

import lombok.Getter;
import lombok.experimental.Accessors;
import org.openqa.selenium.WebDriver;

@Accessors(fluent = true)
@Getter
public class MainPage {

	private final MainPageActController act;
	private final MainPageVerifyController verify;

	public MainPage(WebDriver webDriver) {
		this.act = new MainPageActController(webDriver);
		this.verify = new MainPageVerifyController(webDriver);
	}

	public static MainPage getMainPage(WebDriver webDriver) {
		return new MainPage(webDriver);
	}
}
