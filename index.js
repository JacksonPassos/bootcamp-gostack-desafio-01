const express = require('express')
const server = express()

server.use(express.json())

const arr = []

//middleware global
let count = 0
server.use( (req, res, next) => {
    count++
    console.log("Requisições feitas: " + count)
    return next()
})


//Middleware local, para verificar se existe ID na rota
function checkIdExists(req, res, next) {

    const { id } = req.params

    let exists = false

    for (a in arr) {
        if(arr[a].id == id) exists = true
    }

    if(exists) return next()
    return res.status(400).json({ error: 'ID is required. Please try again!' }) 

}

server.get('/projects', (req, res) => {
    res.json(arr)
})

server.post('/projects', (req, res) => {
    const { id, title } = req.body
    arr.push({id, title, task: []})
    res.json(arr)
})

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
    const { id } = req.params
    const { title } = req.body
    for (a in arr) {
        if(arr[a].id == id) arr[a].task.push(title)
    }
    res.json(arr)
})

server.put('/projects/:id', checkIdExists, (req, res) => {
    const { id } = req.params
    const { title } = req.body

    for (a in arr) {
        if(arr[a].id == id) arr[a].title = title
    }
    
    res.json(arr)
})

server.delete('/projects/:id', checkIdExists, (req, res) => {
    const { id } = req.params

    for (a in arr) {
        if(arr[a].id == id) arr.splice([a], 1)
    }

    res.json(arr)
})

server.listen('3000')