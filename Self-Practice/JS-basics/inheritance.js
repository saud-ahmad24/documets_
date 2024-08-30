// Inheritance allows a class to inherit properties and methods from another class, promoting code reuse. The class that inherits is called the subclass (or child class), and the class it inherits from is the superclass (or parent class).
// Superclass
class Vehicle {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    startEngine() {
        console.log(`${this.make} ${this.model}'s engine started.`);
    }
}

// Subclass
class Car extends Vehicle {
    constructor(make, model, doors) {
        super(make, model);  // Call the parent class constructor
        this.doors = doors;
    }

    // Additional method specific to Car
    honkHorn() {
        console.log(`${this.make} ${this.model} says: Beep beep!`);
    }
}

// Usage
const myCar = new Car('Toyota', 'Corolla', 4);
myCar.startEngine();  // Outputs: Toyota Corolla's engine started.
myCar.honkHorn();     // Outputs: Toyota Corolla says: Beep beep!
