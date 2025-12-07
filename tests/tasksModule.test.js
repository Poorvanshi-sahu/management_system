const tasksModule = require("../modules/tasksModule");
const tasksController = require("../controllers/tasksController");

jest.mock("../controllers/tasksController");

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("TASK MODULE", () => {

    test("createTask → should call controller", async () => {
        tasksController.createTask.mockResolvedValue({
            httpStatus: 201,
            body: { success: true }
        });

        const req = {
            body: { title: "T1", dueDate: "2025-01-01" }
        };
        const res = mockRes();
        const next = jest.fn();

        await tasksModule.createTask(req, res, next);

        expect(tasksController.createTask).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
    });

    test("updateTask → should call controller", async () => {
        tasksController.updateTask.mockResolvedValue({
            httpStatus: 200,
            body: { success: true }
        });

        const req = { params: { id: "1" }, body: { title: "A" } };
        const res = mockRes();
        const next = jest.fn();

        await tasksModule.updateTask(req, res, next);

        expect(tasksController.updateTask).toHaveBeenCalled();
    });

    test("deleteTask → should call controller", async () => {
        tasksController.deleteTask.mockResolvedValue({
            httpStatus: 200,
            body: {}
        });

        const req = { params: { id: "1" } };
        const res = mockRes();
        const next = jest.fn();

        await tasksModule.deleteTask(req, res, next);

        expect(tasksController.deleteTask).toHaveBeenCalled();
    });

    test("completeTask → should call controller", async () => {
        tasksController.completeTask.mockResolvedValue({
            httpStatus: 200,
            body: {}
        });

        const req = { params: { id: "1" } };
        const res = mockRes();
        const next = jest.fn();

        await tasksModule.completeTask(req, res, next);

        expect(tasksController.completeTask).toHaveBeenCalled();
    });

    test("filterTask → should call controller", async () => {
        tasksController.filterTasks.mockResolvedValue({
            httpStatus: 200,
            body: {}
        });

        const req = { query: { status: "pending" } };
        const res = mockRes();
        const next = jest.fn();

        await tasksModule.filterTask(req, res, next);

        expect(tasksController.filterTasks).toHaveBeenCalled();
    });

    test("allTasks → should call controller", async () => {
        tasksController.allTasks.mockResolvedValue({
            httpStatus: 200,
            body: {}
        });

        const req = {};
        const res = mockRes();
        const next = jest.fn();

        await tasksModule.allTasks(req, res, next);

        expect(tasksController.allTasks).toHaveBeenCalled();
    });
});
