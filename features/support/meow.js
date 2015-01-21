
module.exports = function() {
    this.World.prototype.meow = function() {
        for (var i = 0; i < 4; i ++) {
            console.log(Array(16).join('meow '));
        }
    }
}
