package project.ee.notehub.infrastructure.clock;

import java.time.Clock;
import java.time.LocalDateTime;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class ClockConfiguration {

	@Bean
	public Clock configureClock() {
		Clock utcClock = Clock.systemUTC();
		log.debug("Current time set on clock is: {}", LocalDateTime.now(utcClock));

		return utcClock;
	}
}
