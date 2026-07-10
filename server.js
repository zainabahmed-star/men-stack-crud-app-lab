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

app.post('/movies', (req, res) => {
    res.send(req.body)

})

//show all movies
app.get('/movies', async (req, res) => {

    let allMovies = await Movie.find()
    res.send(allMovies)
})

//show a movie by its id == it worked ✅
// app.get('/movies/:id', async (req, res) => {
//     let movieById = await Movie.findById('6a50a128c86b1dee45b79bdf')
//     res.send(movieById)
// })

//edit == didnt work(i dont think we covered this)❌
// app.get('/movies/:id/edit', async (req, res) => {
//     const movie = await Movie.findById(req.params.id)
//     res.render('edit.ejs')
// })



//update based on id == didnt work ❌
// app.put('/movies/:id', async (req, res) => {
//     let updateMovie = await Movie.findByIdAndUpdate("6a50a5d3622664efa6ad208b",
//         {name: 'Wonder'}, {new: true})
//     res.send(updateMovie)
// })

// didnt work ❌
// app.delete('/movies/:id', async (req, res) => {
//     let deletedMovie = await Movie.findByIdAndDelete('6a50a5d3622664efa6ad208b')
//     res.send(deletedMovie)
// })



app.listen(3000, function(){
    console.log('listening to port 3000 🦊')
})