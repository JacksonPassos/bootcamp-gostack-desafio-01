const express = require('express')
const server = express()

server.use(express.json())

const arr = []

server.get('/projects', (req, res) => {
    res.json(arr)
})

server.post('/projects', (req, res) => {
    const { id, title } = req.body
    arr.push({id, title, task: []})
    res.json(arr)
})


server.listen('3000')