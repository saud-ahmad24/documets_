// While JavaScript doesn’t have a native protected modifier, you can use naming conventions (e.g., prefixing with an underscore) to indicate that a property or method should be treated as protected, meaning it’s intended to be accessed only by subclasses.

class Animal {
    constructor(name) {
        this.name = name;
        this._type = 'Unknown';  // Protected-like property
    }

    _describe() {  // Protected-like method
        console.log(`This is a ${this._type} named ${this.name}.`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this._type = 'Dog';  // Accessing protected-like property
        this.breed = breed;
    }

    describe() {
        this._describe();  // Accessing protected-like method
        console.log(`It is a ${this.breed}.`);
    }
}

const myDog = new Dog('Rex', 'Golden Retriever');
myDog.describe();  // Outputs:
                   // This is a Dog named Rex.
                   // It is a Golden Retriever.

console.log(myDog._type);  // Outputs: Dog (Accessible, but should be treated as protected)
myDog._describe();         // Outputs: This is a Dog named Rex. (Accessible, but should be treated as protected)
