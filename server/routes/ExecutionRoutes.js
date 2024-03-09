const express = require('express');
const { execution } = require('../controller/ExecutionController');
const execRouter = express.Router()

/* Routes */
execRouter.post('/', execution)

module.exports = { execRouter }