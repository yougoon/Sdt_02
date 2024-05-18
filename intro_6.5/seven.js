var numbers = [1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10];

var uniqueNumbers = numbers.filter((number, index) => {
    return numbers.indexOf(number) === index;
});

console.log(uniqueNumbers);