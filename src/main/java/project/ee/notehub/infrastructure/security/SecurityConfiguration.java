package project.ee.notehub.infrastructure.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(jsr250Enabled = true, securedEnabled = true)
@RequiredArgsConstructor
class SecurityConfiguration {

	private final JwtAuthenticationConverter jwtAuthenticationConverter;

	@Bean
	@Profile("prod")
	public SecurityFilterChain configureProjectSecurity(
		HttpSecurity httpSecurity
	) throws Exception {
		httpSecurity.csrf(AbstractHttpConfigurer::disable);
		httpSecurity.cors(Customizer.withDefaults());

		httpSecurity.authorizeHttpRequests(httpRequest -> {
			httpRequest.requestMatchers("/api/auth/**").permitAll();
			httpRequest.anyRequest().authenticated();
		});

		httpSecurity.oauth2ResourceServer(httpSecurityOAuth2ResourceServerConfigurer -> {
				httpSecurityOAuth2ResourceServerConfigurer.jwt(jwtCustomizer ->
					jwtCustomizer.jwtAuthenticationConverter(jwtAuthenticationConverter)
				);
			}
		);

		httpSecurity.sessionManagement(httpSecuritySessionManagementConfigurer ->
			httpSecuritySessionManagementConfigurer.sessionCreationPolicy(
				SessionCreationPolicy.STATELESS
			)
		);

		return httpSecurity.build();
	}

	@Bean
	@Profile("test")
	public SecurityFilterChain configureProjectSecurityTest(
		HttpSecurity httpSecurity
	) throws Exception {
		httpSecurity.csrf(AbstractHttpConfigurer::disable);
		httpSecurity.cors(Customizer.withDefaults());

		httpSecurity.authorizeHttpRequests(http -> http.anyRequest().permitAll());

		return httpSecurity.build();
	}
}
