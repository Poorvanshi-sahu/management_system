const { respMsg } = require("../config/constants/taskConstants")
const tasksController = require("../controllers/tasksController")
const errors = require("../utils/error")

class TaskModule {
    async createTask(req, res, next) {
        try {
            const { title, description, dueDate, priority, status } = req.body

            const reqData = { title, description, dueDate, priority, status }

            const response = await tasksController.createTask(reqData)

            return res.status(response.httpStatus).json(response.body)
        } catch (error) {
            return next(new errors.OperationalError(respMsg.WENT_WRONG))
        }
    }

    async updateTask(req, res, next) {
        try {
            console.log("before update")
            const taskId = req.params.id

            const updates = req.body

            const reqData = { taskId, updates }

            const response = await tasksController.updateTask(reqData)

            return res.status(response.httpStatus).json(response.body)
        } catch (error) {
            return next(new errors.OperationalError(respMsg.WENT_WRONG))
        }
    }

    async deleteTask(req, res, next) {
        try {
            const taskId = req.params.id

            console.log(taskId)

            const reqData = { taskId }

            const response = await tasksController.deleteTask(reqData)

            return res.status(response.httpStatus).json(response.body)
        } catch (error) {
            return next(new errors.OperationalError(respMsg.WENT_WRONG))
        }
    }

    async completeTask(req, res, next) {
        try {
            const taskId = req.params.id

            const reqData = { taskId }

            const response = await tasksController.completeTask(reqData)

            return res.status(response.httpStatus).json(response.body)
        } catch (error) {
            return next(new errors.OperationalError(respMsg.WENT_WRONG))
        }
    }

    async filterTask(req, res, next) {
        try {
            const { status, priority } = req.query

            const filter = {}

            if (status) {
                filter.status = status
            }

            if (priority) {
                filter.priority = priority
            }

            const reqData = { filter }

            const response = await tasksController.filterTasks(reqData)

            return res.status(response.httpStatus).json(response.body)
        } catch (error) {
            return next(new errors.OperationalError(respMsg.WENT_WRONG))
        }
    }

    async allTasks(req, res, next) {
        try {
            const response = await tasksController.allTasks()

            return res.status(response.httpStatus).json(response.body)
        } catch (error) {
            return next(new errors.OperationalError(respMsg.WENT_WRONG))
        }
    }
}

module.exports = new TaskModule()