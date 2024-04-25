const express = require('express')
const router = express.Router()
const port = process.env.port || 3000
const fetch =(...args)=> import('node-fetch').then(({ default: fetch}) => fetch(...args))

router.use(express.static('public'))

// localhost:3000
const tables = ['artist', 'band']

// ROOT ROUTE => localhost:3000/api 
router.get('/api', (req, res)=> {
    res.json({
        'Albums': `http://localhost:${port}/api/album`,
        'Artists': `http://localhost:${port}/api/artist`,
        'Bands': `http://localhost:${port}/api/band`
    })
})

tables.forEach(table => {
    router.use(`/api/${table}`, require(`./api/${table}Routes`))
})

// router.use('/api/artist', require('./api/artistRoutes'))
// router.use('/api/band', require('./api/bandRoutes'))


// Home Page => localhost:3000
router.get('/', (req, res)=> {
    // res.render(page, object)
    res.render('pages/home', {
        title: 'Home',
        name: 'My Album Database'
    })
})

tables.forEach(table => {
    router.get(`/${table}`, (req, res)=> {
        const url = `http://localhost:${port}/api/${table}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                res.render(`pages/${table}`, {
                    title: `All ${table}s`,
                    name: `All ${table}s`,
                    data
                })
            })
    })
})

// router.get('/artist', (req, res)=> {
//     const url = `http://localhost:${port}/api/artist`

//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             res.render('pages/artist', {
//                 title: 'All Artists',
//                 name: 'All Artists',
//                 data
//             })
//         })
// })

// router.get('/band', (req, res)=> {
//     const url = `http://localhost:${port}/api/band`

//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             res.render('pages/band', {
//                 title: 'All Bands',
//                 name: 'All Bands',
//                 data
//             })
//         })
// })

router.get('/artist/:id', (req, res)=> {
    const id = req.params.id
    const url = `http://localhost:${port}/api/artist/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const artist = data[0].alias == '' ? `${data[0].fName} ${data[0].lName}` : `${data[0].alias}`

            res.render('pages/artist_single', {
                title: artist,
                name: artist,
                data
            })
        })
})

router.get('/band/:id', (req, res)=> {
    const id = req.params.id
    const url = `http://localhost:${port}/api/band/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const band = data[0].band
            res.render('pages/band_single', {
                title: band,
                name: band,
                data
            })
        })
})

// Error Page 
router.get('*', (req, res)=> {
    if (req.url === '/favicon.ico/') {
        res.end()
    } else {
        res.render('pages/404', {
            title: '404 Error',
            name: '404 Error'
        })
    }
})

module.exports = router