const mongoose = require('mongoose')

// Define model/Schema
const moviesSchema = new mongoose.Schema({
    name: {type: String, required: true}, genre: {
        type: String }, releaseYear: {type: Number}
    })

const Movie = mongoose.model('Movie', moviesSchema)
module.exports = Movie