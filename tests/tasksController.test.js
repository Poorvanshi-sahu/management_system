const tasksController = require("../controllers/tasksController");
const Task = require("../models/task");

jest.mock("../models/task");

describe("TASK CONTROLLER", () => {

    test("createTask → success", async () => {
        Task.create.mockResolvedValue({ _id: 1, title: "A" });

        const res = await tasksController.createTask({
            title: "A",
            dueDate: "2025-01-01"
        });

        expect(res.httpStatus).toBe(201);
        expect(res.body.success).toBe(true);
    });

    test("updateTask → not found", async () => {
        Task.findByIdAndUpdate.mockResolvedValue(null);

        const res = await tasksController.updateTask({
            taskId: "1",
            updates: {}
        });

        expect(res.body.success).toBe(false);
    });

    test("deleteTask → success", async () => {
        Task.findByIdAndDelete.mockResolvedValue({ _id: 1 });

        const res = await tasksController.deleteTask({ taskId: "1" });

        expect(res.body.success).toBe(true);
    });

    test("completeTask → success", async () => {
        Task.findByIdAndUpdate.mockResolvedValue({ _id: 1, status: "completed" });

        const res = await tasksController.completeTask({ taskId: "1" });

        expect(res.body.success).toBe(true);
    });

    test("filterTasks → return filtered data", async () => {
        Task.find.mockResolvedValue([{ _id: 1 }]);

        const res = await tasksController.filterTasks({
            filter: { status: "pending" }
        });

        expect(res.body.count).toBe(1);
    });

    test("allTasks → return all tasks", async () => {
        Task.find.mockResolvedValue([{ _id: 1 }, { _id: 2 }]);

        const res = await tasksController.allTasks();

        expect(res.body.count).toBe(2);
    });
});
