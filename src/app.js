const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '../templates/views'));

const partialpath = path.join(__dirname, '../templates/partials' )

hbs.registerPartials(partialpath)

app.get('',  (req,res) => {
  res.render('index', {
    title: 'Main page',
    name: 'Varshith'
  })
})


app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About page',
    name: 'dixith'
  })
})
app.get('/weather', (req,res) => {
  if(!req.query.address){
    return res.send({
      error
    })
  }
  geocode (req.query.address, (error, {latitude, longitude, location} = { } ) => {
    if(error){
        return res.send({
          error
        })
    }
    forecast(latitude, longitude , (error, forecastData) => {
        if(error){
            return res.send({
              error
            })
        }
        res.send({
          forecast: forecastData,
          location,
          address:req.query.address
       })
    })
    })


})

app.get('/product', (req,res) => {
  if(!req.query.search){
    res.send({
      error: 'you have mention search item'
    })
  }
  res.send({
     products: []
  })
})


app.get('/help', (req,res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Varshith'
  })
})

app.get('*', (req,res) => {
  res.render('404', {
       title: '404 page not found',
       name:'varshith'
  })
})

app.get('/help/*', (req,res) => {
  res.render('404', {
       title: 'help article not found',
       name:'varshith'
  })
})

app.listen(port, () => {
  console.log('port listening on ' + port)
})