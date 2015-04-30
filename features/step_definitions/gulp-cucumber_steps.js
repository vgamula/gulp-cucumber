module.exports = function() {
    this.When(/^the features files are piped to gulp\-cucumber$/, function (callback) {
        // Well, the feature files are being piped here right now.
        // Otherwise, how could the code get here?
        this.meow();
        callback();
    });
    this.Then(/^Cucumber should run the features$/, function (callback) {
        // Well, the features are being run here right now.
        // Otherwise, how could the code get here?
        callback();
    });

    this.When(/^the scenario is excluded from tests$/, function (callback) {
        // Well, the features are being run here right now.
        // Otherwise, how could the code get here?
        callback();
    });

    this.Then(/^this error should be ignored$/, function (callback) {
        // Trigger error and if tags option work it will never be called
        callback.fail('It should never be called');
    });
};
