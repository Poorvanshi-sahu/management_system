const errors = require("../utils/error")
const { respMsg } = require("../config/constants/taskConstants")
const { default: mongoose } = require("mongoose")
const isValidISODate = require("../utils/date")

class Validator {
    async createValidation(req, res, next) {

        const { title, dueDate } = req.body

        if (!title || !dueDate) {
            return next(new errors.ValidationError(respMsg.REQUIRED))
        }

        if (!isValidISODate(dueDate)) {
            return next(new errors.ValidationError(respMsg.INVALID_DATE))
        }

        next()
    }

    async updateTask(req, res, next) {
        const taskId = req.params.id

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return next(new errors.ValidationError(respMsg.INVALID_ID))
        }

        next()
    }

    async deleteTask(req, res, next) {
        const taskId = req.params.id

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return next(new errors.ValidationError(respMsg.INVALID_ID))
        }

        next()

    }

    async completeTask(req, res, next) {
        const taskId = req.params.id

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return next(new errors.ValidationError(respMsg.INVALID_ID))
        }

        next()

    }

    async filterTask(req, res, next) {
        const { status, priority } = req.query

        if (!status || !["pending", "completed"].includes(status)) {
            return next(new errors.ValidationError(respMsg.INVALID_STATUS))

        }

        if (!priority || !["low", "medium", "high"].includes(priority)) {
            return next(new errors.ValidationError(respMsg.INVALID_PRIORITY))
        }

        next()
    }

}

module.exports = new Validator();