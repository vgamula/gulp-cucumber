const { defineSupportCode } = require('cucumber');

class World {
    meow() {
        console.log('Meow!');
    }
}

defineSupportCode(({ setWorldConstructor }) => {
    setWorldConstructor(World);
});
