const mongoose = require('mongoose')

let authSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

let Authmodel;
try {
    Authmodel = mongoose.model('Authmodel');
} catch (error) {
    Authmodel = mongoose.model('Authmodel', authSchema);
}

module.exports = Authmodel;