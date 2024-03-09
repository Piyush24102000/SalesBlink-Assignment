const express = require('express');
const { saveSequence ,getAllSequences} = require('../controller/sequenceController');
const sequenceRouter = express.Router()

sequenceRouter.get('/:userId',getAllSequences)
sequenceRouter.post('/save',saveSequence)

module.exports = { sequenceRouter }