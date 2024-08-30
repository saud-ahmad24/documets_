// Abstraction is the concept of hiding complex implementation details and showing only the essential features of an object. Abstract classes in JavaScript can be simulated by using base classes with methods that throw errors if not implemented by subclasses.
// Abstract class (simulated)
class Employee {
    constructor(name) {
        if (this.constructor === Employee) {
            throw new Error("Cannot instantiate abstract class");
        }
        this.name = name;
    }

    // Abstract method
    calculateSalary() {
        throw new Error("Abstract method 'calculateSalary' must be implemented.");
    }
}

// Subclass
class FullTimeEmployee extends Employee {
    constructor(name, annualSalary) {
        super(name);
        this.annualSalary = annualSalary;
    }

    calculateSalary() {
        return this.annualSalary;
    }
}

// Subclass
class PartTimeEmployee extends Employee {
    constructor(name, hourlyRate, hoursWorked) {
        super(name);
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    calculateSalary() {
        return this.hourlyRate * this.hoursWorked;
    }
}

// Usage
const fullTimeEmp = new FullTimeEmployee('John', 60000);
console.log(fullTimeEmp.calculateSalary()); // Outputs: 60000

const partTimeEmp = new PartTimeEmployee('Jane', 20, 120);
console.log(partTimeEmp.calculateSalary()); // Outputs: 2400
