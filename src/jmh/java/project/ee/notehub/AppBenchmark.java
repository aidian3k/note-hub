package project.ee.notehub;

import static org.mockito.Mockito.when;

import java.sql.Ref;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.BenchmarkMode;
import org.openjdk.jmh.annotations.Mode;
import org.openjdk.jmh.annotations.OutputTimeUnit;
import org.openjdk.jmh.annotations.Scope;
import org.openjdk.jmh.annotations.Setup;
import org.openjdk.jmh.annotations.State;
import org.openjdk.jmh.annotations.TearDown;
import org.openjdk.jmh.infra.Blackhole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import project.ee.notehub.domain.note.data.NoteService;
import project.ee.notehub.domain.note.dto.CreateNoteDTO;
import project.ee.notehub.domain.note.dto.NoteDTO;
import project.ee.notehub.domain.note.dto.UpdateNoteDTO;
import project.ee.notehub.domain.note.entity.Note;
import project.ee.notehub.domain.user.data.CurrentUserService;
import project.ee.notehub.domain.user.data.UserFacade;
import project.ee.notehub.domain.user.data.UserLoginService;
import project.ee.notehub.domain.user.data.UserRefreshTokenManagementService;
import project.ee.notehub.domain.user.data.UserRegistrationService;
import project.ee.notehub.domain.user.dto.UserLoginRequest;
import project.ee.notehub.domain.user.dto.UserLoginResponse;
import project.ee.notehub.domain.user.dto.UserRegistrationRequest;

@TestPropertySource(locations = "classpath:application.yml")
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@State(Scope.Benchmark)
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
@WithMockUser(username = "user@example.com")
public class AppBenchmark extends AbstractBenchmark {

	private static NoteService noteService;
	private static UserFacade userFacade;

	@MockBean
	private static CurrentUserService currentUserService;

	@MockBean
	private static UserRegistrationService userRegistrationService;

	@MockBean
	private static UserRefreshTokenManagementService userRefreshTokenManagementService;

	@MockBean
	private static UserLoginService userLoginService;

	private static UserRegistrationRequest userRegistrationRequest;
	private static UserLoginRequest userLoginRequest;
	private static final String REFRESH_TOKEN = "refreshTOken";

	@Autowired
	public void setNoteService(NoteService service) {
		noteService = service;
	}

	@Autowired
	public void setUserFacade(UserFacade facade) {
		userFacade = facade;
	}

	@Setup
	public void initUser() {
		userLoginRequest =
			UserLoginRequest
				.builder()
				.username("123@wp.pl")
				.password("1slkdjnlsdm")
				.build();
		userRegistrationRequest =
			UserRegistrationRequest
				.builder()
				.firstName("Jan")
				.lastName("Kowal")
				.email("123@wp.pl")
				.password("1slkdjnlsdm")
				.confirmationPassword("1slkdjnlsdm")
				.build();

		when(currentUserService.getCurrentUserEmbeddedId())
			.thenReturn("user@example");
		when(userRegistrationService.registerKeycloakUser(userRegistrationRequest))
			.thenReturn(201);
		when(userLoginService.handleUserLogin(userLoginRequest))
			.thenReturn(
				UserLoginResponse
					.builder()
					.access_token("accessToken")
					.expires_in("123132")
					.refresh_expires_in(123123)
					.refresh_token("refreshToken")
					.build()
			);
		when(userRefreshTokenManagementService.handleRefreshToken(REFRESH_TOKEN))
			.thenReturn(
				UserLoginResponse
					.builder()
					.access_token("accessToken")
					.expires_in("123132")
					.refresh_expires_in(123123)
					.refresh_token("refreshToken")
					.build()
			);
	}

	@TearDown
	public void tearDown() {}

	@Benchmark
	public void getAllNotesBenchmark(Blackhole bh) {
		List<NoteDTO> allNotes = noteService.getAllNotes();
		bh.consume(allNotes);
	}

	@Benchmark
	public void getNotesBySearchWord(Blackhole bh) {
		List<NoteDTO> allNotes = noteService.getNotesBySearchWord("testowanie");
		bh.consume(allNotes);
	}

	@Benchmark
	public void getNoteById(Blackhole bh) {
		NoteDTO allNotes = noteService.getNoteById(1L);
		bh.consume(allNotes);
	}

	@Benchmark
	public void createNote(Blackhole bh) {
		CreateNoteDTO createNoteDTO = new CreateNoteDTO("usnfdsjd", "sodjfnsd");
		CreateNoteDTO allNotes = noteService.createNote(createNoteDTO);
		bh.consume(allNotes);
	}

	@Benchmark
	public void updateNote(Blackhole bh) {
		UpdateNoteDTO updateNoteDTO = new UpdateNoteDTO(1L, "usnfdsjd", "sodjfnsd");
		UpdateNoteDTO allNotes = noteService.updateNote(updateNoteDTO);
		bh.consume(allNotes);
	}

	@Benchmark
	public void deleteNote(Blackhole bh) {
		Note note = Note.builder().id(12L).title("ss").content("SSSS").build();
		noteService.deleteNote(note);
		bh.consume(note);
	}

	@Benchmark
	public void registerUser(Blackhole bh) {
		bh.consume(userFacade.registerUser(userRegistrationRequest));
	}

	@Benchmark
	public void authenticateUser(Blackhole bh) {
		bh.consume(userFacade.authenticateUser(userLoginRequest));
	}

	@Benchmark
	public void handleRefreshToken(Blackhole bh) {
		bh.consume(userFacade.handleRefreshToken(REFRESH_TOKEN));
	}
}
