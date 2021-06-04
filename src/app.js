const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCoding = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//set the route for (index.hbs)-> template engine view: to display content dynamically:
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Fahad Malik'
    })
})

//set the route for (about.hbs)-> template engine view: to display content dynamically:
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Fahad Malik'
    })
})

//set the route for (help.hbs)-> template engine view: to display content dynamically:
app.get('/help', (req,res) => {
    res.render('help', {
        message: 'This is a help page, to show you some help, that how to use and troubleshoot the weather application',
        title: 'Help',
        name: 'Fahad Malik'
    })
})

//setup another route (app.js/weather)
app.get('/weather', (req, res) => {
    if(!req.query.search){
      return res.send({
       error: 'You must provide a search term'	
       })
    }
    geoCoding(req.query.search, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            }) 
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                }) 
            }
            res.send({
                Address: req.query.search,
                location: location,
                forecast: forecastData
        
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404 Page',
        name: 'Fahad Malik'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404 Page',
        name: 'Fahad Malik'
    })
})

//common port for development: 3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
