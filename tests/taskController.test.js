jest.mock("../controllers/tasksController");
const tasksController = require("../controllers/tasksController");
const tasksModule = require("../modules/tasksModule");

describe("Task Module Layer", () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, params: {}, query: {} };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        next = jest.fn();
    });

    // ----------------------- CREATE TASK ----------------------
    test("createTask → should call controller and return response", async () => {
        req.body = {
            title: "Test task",
            description: "desc",
            dueDate: "2025-01-01",
            priority: "high",
            status: "pending",
        };

        tasksController.createTask.mockResolvedValue({
            httpStatus: 201,
            body: { success: true, msg: "created", data: {} },
        });

        await tasksModule.createTask(req, res, next);

        expect(tasksController.createTask).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            msg: "created",
            data: {},
        });
    });

    // ----------------------- UPDATE ---------------------------
    test("updateTask → should call controller", async () => {
        req.params.id = "123";
        req.body = { title: "Updated" };

        tasksController.updateTask.mockResolvedValue({
            httpStatus: 200,
            body: { success: true, msg: "updated", data: {} },
        });

        await tasksModule.updateTask(req, res, next);

        expect(tasksController.updateTask).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    // ----------------------- DELETE ---------------------------
    test("deleteTask → should call controller", async () => {
        req.params.id = "123";

        tasksController.deleteTask.mockResolvedValue({
            httpStatus: 200,
            body: { success: true, msg: "deleted", data: {} },
        });

        await tasksModule.deleteTask(req, res, next);

        expect(tasksController.deleteTask).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    // ----------------------- COMPLETE ---------------------------
    test("completeTask → should call controller", async () => {
        req.params.id = "123";

        tasksController.completeTask.mockResolvedValue({
            httpStatus: 200,
            body: { success: true, msg: "completed", data: {} },
        });

        await tasksModule.completeTask(req, res, next);

        expect(tasksController.completeTask).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    // ----------------------- FILTER ---------------------------
    test("filterTask → should call controller", async () => {
        req.query = { status: "pending" };

        tasksController.filterTasks.mockResolvedValue({
            httpStatus: 200,
            body: { success: true, msg: "filtered", data: [], count: 1 },
        });

        await tasksModule.filterTask(req, res, next);

        expect(tasksController.filterTasks).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    // ----------------------- ALL TASKS ------------------------
    test("allTasks → should call controller", async () => {
        tasksController.allTasks.mockResolvedValue({
            httpStatus: 200,
            body: { success: true, msg: "all", data: [] },
        });

        await tasksModule.allTasks(req, res, next);

        expect(tasksController.allTasks).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });
});


