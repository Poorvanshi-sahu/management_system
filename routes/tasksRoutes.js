const express = require("express")
const router = express.Router()
const tasksModule = require("../modules/tasksModule")
const validationMiddleware = require("../middlewares/validationMiddleware");

router.post("/create", validationMiddleware.createValidation, tasksModule.createTask)

router.post("/update/:id", validationMiddleware.updateTask, tasksModule.updateTask)

router.post("/delete/:id", validationMiddleware.deleteTask, tasksModule.deleteTask)

router.post("/complete/:id", validationMiddleware.completeTask, tasksModule.completeTask)

router.get("/filter", validationMiddleware.filterTask, tasksModule.filterTask);

router.get("/alltasks", tasksModule.allTasks)

module.exports = router