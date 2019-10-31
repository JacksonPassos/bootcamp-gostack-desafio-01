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

server.put('/projects/:id', (req, res) => {
    const { id } = req.params
    const { title } = req.body

    for (a in arr) {
        if(arr[a].id == id) arr[a].title = title
    }
    
    res.json(arr)
})

server.delete('/projects/:id', (req, res) => {
    const { id } = req.params

    for (a in arr) {
        if(arr[a].id == id) arr.splice([a], 1)
    }

    res.json(arr)
})

server.listen('3000')