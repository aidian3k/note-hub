package automation.testing.project.shared.tools;

import java.util.concurrent.TimeUnit;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class WebDriverTools {

	public static void waitUntilElementIsClickable(
		WebDriver webDriver,
		WebElement webElement
	) {
		WebDriverWait wait = new WebDriverWait(webDriver, 10);
		wait.until(ExpectedConditions.elementToBeClickable(webElement));
	}

	public static void implicitlyWait(WebDriver webDriver, int seconds) {
		webDriver.manage().timeouts().implicitlyWait(seconds, TimeUnit.SECONDS);
	}

	public static void makeProgramWait(int seconds) {
		try {
			Thread.sleep(seconds * 1000L);
		} catch (InterruptedException ignored) {}
	}
}
