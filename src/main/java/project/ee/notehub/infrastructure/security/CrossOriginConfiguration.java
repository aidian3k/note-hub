package project.ee.notehub.infrastructure.security;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration(proxyBeanMethods = false)
class CrossOriginConfiguration {

	@Bean
	public CorsConfigurationSource configureCors() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedMethod("*");
		configuration.addAllowedOrigin("*");
		configuration.setAllowedOrigins(List.of("*"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}
}
