// JavaScript introduced private class fields with the # prefix in ES2020. These fields are truly private and can only be accessed within the class.

class User {
    #password;  // Private property using #

    constructor(name, age, password) {
        this.name = name;
        this.age = age;
        this.#password = password;  // Set private property
    }

    // Public method
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }

    // Private method
    #getPassword() {
        return this.#password;
    }

    checkPassword(inputPassword) {
        return inputPassword === this.#getPassword();
    }
}

const user = new User('Bob', 40, 'secretPassword');
console.log(user.name);  // Outputs: Bob (Public access)
user.greet();            // Outputs: Hello, my name is Bob and I am 40 years old. (Public access)

console.log(user.#password);  // Error: Private field '#password' must be declared in an enclosing class
console.log(user.#getPassword());  // Error: Private method '#getPassword' must be declared in an enclosing class

console.log(user.checkPassword('secretPassword'));  // Outputs: true (Access through a public method)
