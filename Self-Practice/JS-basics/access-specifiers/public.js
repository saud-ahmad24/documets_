// By default, all class properties and methods are public and can be accessed from outside the class.

class User {
    constructor(name, age) {
        this.name = name;  // Public property
        this.age = age;    // Public property
    }

    greet() {  // Public method
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

const user = new User('Alice', 30);
console.log(user.name);  // Outputs: Alice (Public access)
user.greet();            // Outputs: Hello, my name is Alice and I am 30 years old. (Public access)
