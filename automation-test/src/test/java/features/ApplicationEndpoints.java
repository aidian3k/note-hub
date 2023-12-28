package features;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ApplicationEndpoints {

	public static final String LOGIN_URL = "http://localhost/login";
	public static final String REGISTER_URL = "http://localhost/register";
}
