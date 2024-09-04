package main

import "fmt"

func main() {
    var message string = "Hello, Go!"
	messageS := "Hello, Go!!!!!!!!"
    fmt.Println(message)
	fmt.Println(messageS)


	var x = 1
	if x > 0 {
		fmt.Println("x is positive")
	} else {
		fmt.Println("x is not positive")
	}
	

	for i := 0; i < 5; i++ {
		fmt.Println(i)
	}

	var day = "Friday"
	switch day {
	case "Monday":
		fmt.Println("Start of the workweek")
	case "Friday":
		fmt.Println("Almost weekend!")
	default:
		fmt.Println("Midweek")
	}
	
	
}
