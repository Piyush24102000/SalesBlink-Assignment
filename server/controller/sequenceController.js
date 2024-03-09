const mongoose = require("mongoose")
const SequenceModel = require("../models/SequenceModel")


const saveSequence = async (req, res) => {
    try {
        /* Validation */
        let { nodes, userId, edges, name } = req.body

        /* Business Logic */
        userId = userId.split(':')[1]

        let checkIfNamePresent = await SequenceModel.findOne({ name, userId })
        if (checkIfNamePresent) {
            await SequenceModel.findOneAndUpdate({ name, userId }, { $set: { nodes, edges } }, { new: true })
            return res.status(200).json({ message: "Saved Successfully", success: true })
        }
        let createSequence = await SequenceModel.create({ nodes, edges, name, userId })
        return res.status(201).json({ message: 'Sequence Created Successfully', success: true })

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

const getAllSequences = async (req, res) => {
    try {
        /* Validation */
        let userId = req.params.userId
        userId = userId.split(':')[1]

        /* Business Logic */
        let getAllSequences = await SequenceModel.find( {userId} )

        return res.status(200).json({ data: getAllSequences, success: true, message: "Sequences fetched" })
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}
module.exports = { saveSequence, getAllSequences }

