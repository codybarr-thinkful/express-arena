const numbers = [1, 3, 4, 5, 9, 9]
const generatedNumbers = [1, 3, 4, 5, 8, 8]

const matchCount = numbers.reduce((acc, curr) => {
	if (generatedNumbers.includes(curr)) {
		acc += 1
	}
	return acc
}, 0)

console.log({ matchCount })
