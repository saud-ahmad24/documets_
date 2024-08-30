// Polymorphism allows objects of different classes to be treated as objects of a common superclass. It also allows methods to do different things based on the object that is calling them.
// Superclass
class Shape {
    draw() {
        console.log('Drawing a shape');
    }
}

// Subclass 1
class Circle extends Shape {
    draw() {
        console.log('Drawing a circle');
    }
}

// Subclass 2
class Rectangle extends Shape {
    draw() {
        console.log('Drawing a rectangle');
    }
}

// Usage
const shapes = [new Shape(), new Circle(), new Rectangle()];

shapes.forEach(shape => {
    shape.draw();  // Outputs:
                   // Drawing a shape
                   // Drawing a circle
                   // Drawing a rectangle
});
