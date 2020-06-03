const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '..\\public'))



const app = express()
const port = process.env.PORT || 3000


//Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '..\\public')))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Calvin Collins'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is the help page',
        name: 'Calvin Collins'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Calvin Collins'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, response)=> {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                foreCast: response,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }
    else {
        console.log(req.query)
        res.send({
            products: []
        })
    }   
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Calvin Collins',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Calvin Collins',
        errorMessage: 'Page not found.'
    })
})

// app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server up and running on ' + port)
})