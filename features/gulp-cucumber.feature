Feature: gulp-cucumber

  Scenario: Using gulp-cucumber
    When the features files are piped to gulp-cucumber
    Then Cucumber should run the features

  @wip
  Scenario: Using tags filter
    When the scenario is excluded from tests
    Then this error should be ignored
