const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')
const app = express()

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name} 🥭`);
});

//import the model
const Movie = require("./models/movie.js")

//above morgan
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'))

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

//render home page in route /movies ✅
// app.get('/movies', async (req, res) => {
//     res.render('home.ejs')
    
// })


// show all movies ✅
app.get('/movies', async (req, res) => {
    let allMovies = await Movie.find()
    // console.log(allMovies)
    res.render('index.ejs', {
        allMovies: allMovies
    })
})

// show a movie by its id  ✅
app.get('/movies/:movieId', async (req, res) => {
    let movieById = await Movie.findById(req.params.movieId)
    res.render('show.ejs', {
        item: movieById
    })
})

// find and delete ✅
app.delete('/movies/:movieId', async (req, res) => {
    await Movie.findByIdAndDelete(req.params.movieId)
    res.redirect('/movies')
})



//edit == didnt work(i dont think we covered this)❌
// app.put('/movies/:movieId', async (req, res) => {
//     const movieEdit = await Movie.findById(req.params.id)
//     res.render('edit.ejs')
// })

app.get('/movies/:movieId/edit', async (req, res) => {
    let movieById = await Movie.findById(req.params.movieId)
    console.log(movieById)
res.render('edit.ejs',{
    movieById: movieById
})


})

//update movies in database
app.put('/movies/:movieId', async (req, res) => {
    const movieData = {}
    movieData.name = req.body.name
    console.log('req.body: ', req.body)
     let updateMovie = await Movie.findByIdAndUpdate(req.params.movieId, req.body, {new: true})
     res.redirect(`/movies/${req.params.movieId}`)
})

//update based on id == didnt work ❌
// app.put('/movies/:id', async (req, res) => {
//     let updateMovie = await Movie.findByIdAndUpdate(req.params.id,
//         {name: 'Wonder'}, {new: true})
//     res.send(updateMovie)
// })

/



app.listen(3000, function(){
    console.log('listening to port 3000 🦊')
})