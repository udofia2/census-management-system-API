const mongoose = require('mongoose')

const {Schema } = mongoose

const citizenSchema = new Schema({
    //Personal Data
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    citizenID: String,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Transgender']

    },
    age: {
        type: Number
    },
    DOB: {
        type: Date
    },
    occupation: {
        type: String
    },
    maritalStatus: {
        type: String
    },
    //Natioal Data
    nationality: {
        type: String
    },
    state: String,
    city: String,
    LGA: String,
    homeTown: String,
    religion: String, 

    //Biological Data
    weight: Number,
    height: Number,
    bloodGroup: String,

    // Parental Data
    fathersN: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = Citizen = mongoose.model('citizens', citizenSchema)