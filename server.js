const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const app = express()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name} 🥭`);
});

//import the model
const Movie = require("./models/movie.js")

//above morgan
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "public")))

// adding movies to database == it worked ✅
// app.get('/movies', async (req, res) => {
//     const movieData = {}
//     movieData.name = 'Léon'
//     movieData.genre = 'Action'
//     movieData.releaseYear = 1994

//     let createdMovie = await Movie.create(movieData)

// res.send(movieData)
// })

//new page (form for logging a movie)
app.get("/movies/new", async (req, res) => {
  res.render('new.ejs')
});

app.post('/movies', async (req, res) => {
    const movieData = {}
    movieData.name = req.body.name
    movieData.genre = req.body.genre
    movieData.releaseYear = req.body.releaseYear

    if (req.body.isWatched === 'on'){
        movieData.isWatched = true
    } else {
        movieData.isWatched = false
    }

    let createdMovie = await Movie.create(movieData)
    res.redirect('/movies')

})

// show all movies ✅
app.get('/movies', async (req, res) => {

    let allMovies = await Movie.find()
    res.send(allMovies)
})

// show a movie by its id  ✅
app.get('/movies/:id', async (req, res) => {
    let movieById = await Movie.findById(req.params.id)
    res.send(movieById)
})

//edit == didnt work(i dont think we covered this)❌
// app.get('/movies/:id/edit', async (req, res) => {
//     const movie = await Movie.findById(req.params.id)
//     res.render('edit.ejs')
// })

//update based on id == didnt work ❌
// app.put('/movies/:id', async (req, res) => {
//     let updateMovie = await Movie.findByIdAndUpdate(req.params.id,
//         {name: 'Wonder'}, {new: true})
//     res.send(updateMovie)
// })

// didnt work ❌
// app.delete('/movies/:id', async (req, res) => {
//     let deletedMovie = await Movie.findByIdAndDelete(req.params.id)
//     res.send(deletedMovie)
// })



app.listen(3000, function(){
    console.log('listening to port 3000 🦊')
})