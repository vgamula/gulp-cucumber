var myStepDefinitionsWrapper = function() {
    this.Then(/^I should pass this test$/, function(callback) {
        //allback.fail(new Error("Expected to be on page with title "));
        callback();
    });
};

module.exports = myStepDefinitionsWrapper;
