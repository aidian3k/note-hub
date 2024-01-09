package project.ee.notehub;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openjdk.jmh.results.format.ResultFormatType;
import org.openjdk.jmh.runner.Runner;
import org.openjdk.jmh.runner.RunnerException;
import org.openjdk.jmh.runner.options.Options;
import org.openjdk.jmh.runner.options.OptionsBuilder;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;

public abstract class AbstractBenchmark {
  private final static Integer MEASUREMENT_ITERATIONS = 3;
  private final static Integer WARMUP_ITERATIONS = 1;

  @LocalServerPort
  protected Integer port;

  static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>(
      "postgres:15-alpine"
  );

  @BeforeAll
  static void beforeAll() {
    postgres.start();
  }

  @AfterAll
  static void afterAll() {
    postgres.stop();
  }

  @DynamicPropertySource
  static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  /**
   * Any benchmark, by extending this class, inherits this single @Test method for JUnit to run.
   */
  @Test
  public void executeJmhRunner() throws RunnerException {
    Options jmhRunnerOptions = new OptionsBuilder()
        // set the class name regex for benchmarks to search for to the current class
        .include("\\." + this.getClass().getSimpleName() + "\\.")
        .warmupIterations(WARMUP_ITERATIONS)
        .measurementIterations(MEASUREMENT_ITERATIONS)
        // do not use forking or the benchmark methods will not see references stored within its class
        .forks(0)
        // do not use multiple threads
        .threads(1)
        .shouldDoGC(true)
        .shouldFailOnError(true)
        .resultFormat(ResultFormatType.JSON)
        .result("/dev/null") // set this to a valid filename if you want reports
        .shouldFailOnError(true)
        .jvmArgs("-server")
        .build();

    new Runner(jmhRunnerOptions).run();
  }
}
