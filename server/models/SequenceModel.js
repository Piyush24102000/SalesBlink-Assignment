const mongoose = require('mongoose')

let sequenceSchema = mongoose.Schema({
    userId: { type: String },
    name: { type: String },
    nodes: [{ type: Object }],
    edges: [{ type: Object }],
})

let SequenceModel;
try {
    SequenceModel = mongoose.model('Sequencemodel');
} catch (error) {
    SequenceModel = mongoose.model('Sequencemodel', sequenceSchema);
}

module.exports = SequenceModel;