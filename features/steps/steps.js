var myStepDefinitionsWrapper = function() {
    this.Then(/^I should pass this test$/, function(callback) {
        //callback.fail(new Error("Expected to be on page with title "));
        callback();
    });
    this.Then(/^I should pass this test2$/, function(callback) {
        //callback.fail(new Error("Expected to be on page with title "));
        callback();
    });
};

module.exports = myStepDefinitionsWrapper;
