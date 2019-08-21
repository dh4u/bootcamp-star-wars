// Using a modified version of server.js from Example 2
//The custom server we wrote is similar to the “next” binary command.
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
    const server = express()

    /*Here, we simply mapped a custom route to our existing page "/public/details.js". We have also mapped query params as well. */
    server.get('/person/:id', (req, res) => {
        const actualPage = '/details'
        const queryParams = { id: req.params.id }
        app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})