const express = require("express")
const router = express.Router()
const tasksModule = require("../modules/tasksModule")

router.post("/create", tasksModule.createTask)

router.post("/update/:id", tasksModule.updateTask)

router.post("/delete/:id", tasksModule.deleteTask)

router.post("/complete/:id", tasksModule.completeTask)

router.get("/filter", tasksModule.filterTask);

router.get("/alltasks", tasksModule.allTasks)



module.exports = router