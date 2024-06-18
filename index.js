const express = require('express')
const app = express()

app.use(express.json())
let persons =  [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    console.log("logs")
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const response = 'Phonebook has info for ' + persons.length + ' people <br/> ' + new Date()
    res.send(response)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if(!body.name){
        return res.status(404).json({
            'error': 'content missing'
        })
    }
    const existingPerson = persons.find(person => person.name === body.name)

    if(existingPerson){
        return res.status(400).json({
            error: 'name and number are required'
        })
    }

    const person = {
        id: Math.random() * 1000,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})