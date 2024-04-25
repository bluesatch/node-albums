const express = require('express')
const server = express()
const router = require('./app/routes/router')
const helmet = require('helmet')
const cors = require('cors')

const port = process.env.port || 3000

// Handle security
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    directives: {
        "img-src": ["'self'", "https: data"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]
    }
}))

server.use(cors()).use(express.json()).use(express.urlencoded({ extended: true }))

//localhost:3000
server.use('/', router)
server.set('view engine', 'ejs')

// .listen(port, callback func)
server.listen(port, ()=> console.log(`PORTY in room ${port}`))