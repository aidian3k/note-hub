package automation.testing.project.shared.domain;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
public class User {

	private String email;
	private String password;
	private String username;
	private String name;
	private LocalDate birthdayDate;
}
