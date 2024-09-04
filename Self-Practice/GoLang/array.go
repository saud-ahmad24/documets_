package main

import (
	"fmt"
)

func main() {
	var arr1 = [3]int{1, 2, 3}
	arr2 := [...]int{4, 5, 6, 7, 8}
	var cars = [4]string{"Volvo", "BMW", "Ford", "Mazda"}
	prices := [3]int{10, 20, 30}

	fmt.Println(prices[0])
	fmt.Println(prices[2])
	prices[2] = 50
	fmt.Println(prices)
	fmt.Print(cars)
	fmt.Println(arr1)
	fmt.Println(arr2)

	arr13 := [5]int{1: 10, 2: 40}

	fmt.Println(arr13)
	fmt.Println(len(arr1))
}
