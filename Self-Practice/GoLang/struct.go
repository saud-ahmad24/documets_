package main

import "fmt"

type Person struct {
	Name string
	Age  int
}

func main() {
	p := Person{Name: "John", Age: 30}
	fmt.Println(p.Name, p.Age)
}
