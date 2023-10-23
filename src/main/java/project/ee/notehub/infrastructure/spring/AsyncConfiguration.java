package project.ee.notehub.infrastructure.spring;

import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableAsync
@EnableScheduling
@Profile("!local")
class AsyncConfiguration {
}
