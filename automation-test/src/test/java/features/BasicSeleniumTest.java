package features;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.TestInstance;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeOptions;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BasicSeleniumTest {

	protected WebDriver webDriver;
	protected ChromeOptions chromeOptions;

	@BeforeAll
	public void setUp() {
		this.chromeOptions = new ChromeOptions();
		WebDriverManager.chromedriver().setup();
		// chromeOptions.addArguments("--headless");
		// chromeOptions.addArguments("--disable-gpu");
	}

	@AfterEach
	void tearDown() {
		webDriver.close();
	}
}
