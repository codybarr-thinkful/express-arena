const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
	res.send('Hello Express!')
})

app.get('/echo', (req, res) => {
	const responseText = `Here are some details of your request:
	  Base URL: ${req.baseUrl}
	  Host: ${req.hostname}
	  Path: ${req.path}
	  Body: ${req.body}
	`
	res.json(req.body)
})

app.get('/queryViewer', (req, res) => {
	console.log(req.query)
	res.end() //do not send any data back to the client
})

app.get('/greeting', (req, res) => {
	const { name, race } = req.query

	if (!name) {
		return res.status(400).send('Please provide a name')
	}

	if (!race) {
		return res.status(400).send('Please provide a race')
	}

	const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`

	res.send(greeting)
})

app.get('/burgers', (req, res) => {
	res.send('We have juicy cheese burgers!')
})

app.get('/pizza/pepperoni', (req, res) => {
	res.send('Your pizza is on the way!')
})

app.get('/pizza/pineapple', (req, res) => {
	res.send(`We don't serve that here. Never call again!`)
})

// Node Module / Checkpoint 3
app.get('/sum', (req, res) => {
	const { a, b } = req.query

	if (!a) {
		return res.status(400).send(`Please provide 'a'`)
	}

	if (!b) {
		return res.status(400).send(`Please provide 'b'`)
	}

	const sum = `The sum of 'a' and 'b' is: ${Number(a) + Number(b)}`
	res.send(sum)
})

app.get('/cipher', (req, res) => {
	const { text, shift } = req.query

	if (!text) {
		return res.status(400).send(`Please provide 'text'`)
	}

	if (!shift || !Number(shift)) {
		return res.status(400).send(`Please provide 'shift' (a number)`)
	}

	const encrypted = text
		.toLowerCase()
		.split('')
		.map(letter => {
			const shiftedLetterCode = letter.charCodeAt(0) - 97 + Number(shift)
			return String.fromCharCode((shiftedLetterCode % 26) + 97)
		})
		.join('')

	res.send(encrypted)
})

app.get('/lotto', (req, res) => {
	const { numbers } = req.query

	if (!numbers || numbers.length < 6) {
		res.status(400).send(`Please provide 6 numbers.`)
	}

	const guesses = numbers
		.map(n => parseInt(n))
		.filter(n => !Number.isNaN(n) && n >= 1 && n <= 20)

	if (guesses.length != 6) {
		res.status(400).send(`Provided numbers must be between 1 and 20.`)
	}

	const generatedNumbers = [...Array(6).keys()].map(
		() => Math.floor(Math.random() * 20) + 1
	)

	const matchCount = guesses.reduce((acc, curr) => {
		if (generatedNumbers.includes(curr)) {
			acc += 1
		}
		return acc
	}, 0)

	let matchMessage = `Sorry, you lose.`

	if (matchCount === 4) {
		matchMessage = `Congratulations, you win a free ticket`
	}

	if (matchCount === 5) {
		matchMessage = `Congratulations! You win $100!`
	}

	if (matchCount === 6) {
		matchMessage = `Wow! Unbelievable! You could have won the mega millions!`
	}

	const finalMessage = `
		Your numbers were:          ${guesses}
		The generated numbers were: ${generatedNumbers}
		You matched ${matchCount} numbers
		${matchMessage}`

	res.send(finalMessage)
})

app.listen(8000, () => {
	console.log('Express server is live at http://localhost:8000 !')
})
