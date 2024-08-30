// Abstraction: Base class
class Animal {
    constructor(name) {
        this._name = name;  // Encapsulation: Private property (conventionally private using _)
    }

    // Encapsulation: Getter and Setter
    get name() {
        return this._name;
    }

    set name(newName) {
        if (newName.length > 0) {
            this._name = newName;
        } else {
            console.log('Name cannot be empty');
        }
    }

    // Abstraction: Method to be overridden by subclasses
    speak() {
        throw new Error("Method 'speak()' must be implemented.");
    }
}

// Inheritance: Subclass inheriting from Animal
class Dog extends Animal {
    constructor(name, breed) {
        super(name);  // Calling the parent class constructor
        this._breed = breed;
    }

    // Polymorphism: Overriding the base class method
    speak() {
        console.log(`${this._name} says: Woof!`);
    }

    // Additional method specific to Dog
    fetch() {
        console.log(`${this._name} is fetching!`);
    }
}

// Inheritance: Subclass inheriting from Animal
class Cat extends Animal {
    constructor(name, color) {
        super(name);  // Calling the parent class constructor
        this._color = color;
    }

    // Polymorphism: Overriding the base class method
    speak() {
        console.log(`${this._name} says: Meow!`);
    }

    // Additional method specific to Cat
    scratch() {
        console.log(`${this._name} is scratching!`);
    }
}

// Using the classes
const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak();    // Outputs: Buddy says: Woof!
myDog.fetch();    // Outputs: Buddy is fetching!

const myCat = new Cat('Whiskers', 'Black');
myCat.speak();    // Outputs: Whiskers says: Meow!
myCat.scratch();  // Outputs: Whiskers is scratching!

// Demonstrating Encapsulation
myDog.name = '';       // Outputs: Name cannot be empty
myDog.name = 'Max';    // Setting a new name
console.log(myDog.name);  // Outputs: Max
