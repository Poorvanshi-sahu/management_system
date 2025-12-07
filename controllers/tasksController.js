const statusCodes = require("../config/constants/statusCodes")
const { respMsg } = require("../config/constants/taskConstants")
const Task = require("../models/task")

class TaskController {
    async createTask(reqData) {
        try {
            const { title, description, dueDate, priority, status } = reqData

            const task = await Task.create({
                title,
                description,
                dueDate,
                priority,
                status
            })

            return {
                httpStatus: statusCodes.CREATED,
                body: {
                    success: true,
                    msg: respMsg.created("task"),
                    data: task
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateTask(reqData) {
        try {
            const { taskId, updates } = reqData

            const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true, runValidators: true })

            if (!updatedTask) {
                return {
                    httpStatus: statusCodes.INTERNAL_SERVER_ERROR,
                    body: {
                        success: false,
                        msg: respMsg.notFound("task"),
                        data: {}
                    }
                }
            }

            return {
                httpStatus: statusCodes.OK,
                body: {
                    success: true,
                    msg: respMsg.updated("task"),
                    data: updatedTask
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteTask(reqData) {
        try {
            const { taskId } = reqData

            const deletedTask = await Task.findByIdAndDelete(taskId)

            if (!deletedTask) {
                return {
                    httpStatus: statusCodes.INTERNAL_SERVER_ERROR,
                    body: {
                        success: false,
                        msg: respMsg.notFound("task"),
                        data: {}
                    }
                }
            }

            return {
                httpStatus: statusCodes.OK,
                body: {
                    success: true,
                    msg: respMsg.deleted("task"),
                    data: {}
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async completeTask(reqData) {
        try {
            const { taskId } = reqData

            const status = "completed"

            const updatedTask = await Task.findByIdAndUpdate(taskId, status, { new: true })

            if (!updatedTask) {
                return {
                    httpStatus: statusCodes.INTERNAL_SERVER_ERROR,
                    body: {
                        success: false,
                        msg: respMsg.notFound("task"),
                        data: {}
                    }
                }
            }

            return {
                httpStatus: statusCodes.OK,
                body: {
                    success: true,
                    msg: respMsg.complete("task"),
                    data: updatedTask
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async allTasks(reqData) {
        try {
            const all = await Task.find()

            const count = all.length

            return {
                httpStatus: statusCodes.OK,
                body: {
                    success: true,
                    msg: respMsg.getAll("tasks"),
                    count,
                    data: all,
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async filterTasks(reqData) {
        try {
            const { filter } = reqData

            const all = await Task.find(filter)

            const count = all.length

            return {
                httpStatus: statusCodes.OK,
                body: {
                    success: true,
                    msg: respMsg.getAll("tasks"),
                    data: all,
                    count
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}



module.exports = new TaskController()