// Encapsulation is the bundling of data (attributes) and methods (functions) that operate on the data into a single unit, usually a class. In JavaScript, encapsulation can be achieved through private properties and methods, and by using getter and setter methods to control access.

class Employee {
    constructor(name, salary) {
        this._name = name;   // Private property convention (using _)
        this._salary = salary;  // Private property
    }

    // Getter method
    get name() {
        return this._name;
    }

    // Setter method
    set name(newName) {
        if (newName.length > 0) {
            this._name = newName;
        } else {
            console.log('Name cannot be empty');
        }
    }

    // Method to get salary
    getSalary() {
        return this._salary;
    }

    // Method to set salary
    setSalary(newSalary) {
        if (newSalary > 0) {
            this._salary = newSalary;
        } else {
            console.log('Salary must be positive');
        }
    }
}

// Usage
const emp = new Employee('Alice', 50000);
console.log(emp.name);  // Outputs: Alice
emp.setSalary(55000);   // Updates salary
console.log(emp.getSalary()); // Outputs: 55000
