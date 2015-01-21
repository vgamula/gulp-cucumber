Feature: gulp-cucumber

  Scenario: Using gulp-cucumber
    When the features files are piped to gulp-cucumber
    Then Cucumber should run the features
