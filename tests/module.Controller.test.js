


jest.mock("../models/task");
const Task = require("../models/task");
const tasksController = require("../controllers/tasksController");

describe("Task Controller Layer", () => {

    // ----------------------- CREATE TASK ----------------------
    test("createTask → should create and return task", async () => {
        Task.create.mockResolvedValue({ id: 1, title: "Test" });

        const response = await tasksController.createTask({
            title: "Test",
            description: "desc",
        });

        expect(Task.create).toHaveBeenCalled();
        expect(response.httpStatus).toBe(201);
        expect(response.body.data).toEqual({ id: 1, title: "Test" });
    });

    // ----------------------- UPDATE TASK ----------------------
    test("updateTask → returns 500 when not found", async () => {
        Task.findByIdAndUpdate.mockResolvedValue(null);

        const response = await tasksController.updateTask({
            taskId: "123",
            updates: {},
        });

        expect(response.httpStatus).toBe(500);
        expect(response.body.success).toBe(false);
    });

    test("updateTask → success", async () => {
        Task.findByIdAndUpdate.mockResolvedValue({ id: "123", title: "Updated" });

        const response = await tasksController.updateTask({
            taskId: "123",
            updates: { title: "Updated" },
        });

        expect(response.httpStatus).toBe(200);
        expect(response.body.success).toBe(true);
    });

    // ----------------------- DELETE TASK ----------------------
    test("deleteTask → success", async () => {
        Task.findByIdAndDelete.mockResolvedValue({ id: "123" });

        const response = await tasksController.deleteTask({ taskId: "123" });

        expect(response.httpStatus).toBe(200);
        expect(response.body.success).toBe(true);
    });

    test("deleteTask → not found", async () => {
        Task.findByIdAndDelete.mockResolvedValue(null);

        const response = await tasksController.deleteTask({ taskId: "123" });

        expect(response.httpStatus).toBe(500);
        expect(response.body.success).toBe(false);
    });

    // ----------------------- COMPLETE -------------------------
    test("completeTask → success", async () => {
        Task.findByIdAndUpdate.mockResolvedValue({ id: "123", status: "completed" });

        const response = await tasksController.completeTask({ taskId: "123" });

        expect(response.httpStatus).toBe(200);
        expect(response.body.success).toBe(true);
    });

    // ----------------------- ALL TASKS ------------------------
    test("allTasks → success", async () => {
        Task.find.mockResolvedValue([{ id: 1 }, { id: 2 }]);

        const response = await tasksController.allTasks();

        expect(response.httpStatus).toBe(200);
        expect(response.body.count).toBe(2);
    });

    // ----------------------- FILTER ---------------------------
    test("filterTasks → success", async () => {
        Task.find.mockResolvedValue([{ id: 1 }]);

        const response = await tasksController.filterTasks({ filter: { status: "pending" } });

        expect(Task.find).toHaveBeenCalledWith({ status: "pending" });
        expect(response.httpStatus).toBe(200);
    });
});
