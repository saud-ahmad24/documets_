// Another way to create private variables in JavaScript is by using closures.


function createUser(name, age, password) {
    let _password = password;  // Private variable via closure

    return {
        name,  // Public property
        age,   // Public property

        greet() {  // Public method
            console.log(`Hello, my name is ${name} and I am ${age} years old.`);
        },

        checkPassword(inputPassword) {
            return inputPassword === _password;
        }
    };
}

const user = createUser('Charlie', 25, 'myPassword');
console.log(user.name);  // Outputs: Charlie (Public access)
user.greet();            // Outputs: Hello, my name is Charlie and I am 25 years old. (Public access)

console.log(user._password);  // Undefined (Cannot access private variable directly)
console.log(user.checkPassword('myPassword'));  // Outputs: true (Access through a public method)
