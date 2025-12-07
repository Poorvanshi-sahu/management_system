// tests/task.routes.test.js
const request = require("supertest");
const express = require("express");
const taskRoutes = require("../routes/tasksRoutes");
const tasksModule = require("../modules/tasksModule");
const errors = require("../utils/error");

// Mock the tasksModule functions
jest.mock("../modules/tasksModule", () => ({
    createTask: jest.fn((req, res) => res.status(200).json({ msg: "createTask called" })),
    updateTask: jest.fn((req, res) => res.status(200).json({ msg: "updateTask called" })),
    deleteTask: jest.fn((req, res) => res.status(200).json({ msg: "deleteTask called" })),
    completeTask: jest.fn((req, res) => res.status(200).json({ msg: "completeTask called" })),
    filterTask: jest.fn((req, res) => res.status(200).json({ msg: "filterTask called" })),
    allTasks: jest.fn((req, res) => res.status(200).json({ msg: "allTasks called" })),
}));

// Setup Express app for testing
const app = express();
app.use(express.json());
app.use("/api/v1/task", taskRoutes);

// Utility for catching errors from next()
app.use((err, req, res, next) => {
    if (err instanceof errors.ValidationError) {
        return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Server Error" });
});

describe("Task Routes", () => {

    describe("POST /create", () => {
        it("should return 400 if title or dueDate is missing", async () => {
            const res = await request(app).post("/api/v1/task/create").send({ title: "Task" });
            expect(res.status).toBe(400);
            expect(res.body.error).toBeDefined();
        });

        it("should return 400 if dueDate is invalid", async () => {
            const res = await request(app).post("/api/v1/task/create").send({ title: "Task", dueDate: "invalid" });
            expect(res.status).toBe(400);
            expect(res.body.error).toBeDefined();
        });

        it("should call createTask if data is valid", async () => {
            const res = await request(app).post("/api/v1/task/create").send({ title: "Task", dueDate: "2025-12-10" });
            expect(res.status).toBe(200);
            expect(res.body.msg).toBe("createTask called");
        });
    });

    describe("POST /update/:id", () => {
        it("should return 400 if id is invalid", async () => {
            const res = await request(app).post("/api/v1/task/update/123").send({});
            expect(res.status).toBe(400);
            expect(res.body.error).toBeDefined();
        });

        it("should call updateTask if id is valid", async () => {
            const validId = "650000000000000000000000";
            const res = await request(app).post(`/api/v1/task/update/${validId}`).send({});
            expect(res.status).toBe(200);
            expect(res.body.msg).toBe("updateTask called");
        });
    });

    describe("POST /delete/:id", () => {
        it("should return 400 if id is invalid", async () => {
            const res = await request(app).post("/api/v1/task/delete/123").send();
            expect(res.status).toBe(400);
            expect(res.body.error).toBeDefined();
        });

        it("should call deleteTask if id is valid", async () => {
            const validId = "650000000000000000000000";
            const res = await request(app).post(`/api/v1/task/delete/${validId}`).send();
            expect(res.status).toBe(200);
            expect(res.body.msg).toBe("deleteTask called");
        });
    });

    describe("POST /complete/:id", () => {
        it("should return 400 if id is invalid", async () => {
            const res = await request(app).post("/api/v1/task/complete/123").send();
            expect(res.status).toBe(400);
            expect(res.body.error).toBeDefined();
        });

        it("should call completeTask if id is valid", async () => {
            const validId = "650000000000000000000000";
            const res = await request(app).post(`/api/v1/task/complete/${validId}`).send();
            expect(res.status).toBe(200);
            expect(res.body.msg).toBe("completeTask called");
        });
    });

    describe("GET /filter", () => {
        it("should return 400 if status is invalid", async () => {
            const res = await request(app).get("/api/v1/task/filter?status=invalid&priority=low");
            expect(res.status).toBe(400);
            expect(res.body.error).toBeDefined();
        });

        it("should return 400 if priority is invalid", async () => {
            const res = await request(app).get("/api/v1/task/filter?status=pending&priority=invalid");
            expect(res.status).toBe(400);
            expect(res.body.error).toBeDefined();
        });

        it("should call filterTask if query is valid", async () => {
            const res = await request(app).get("/api/v1/task/filter?status=pending&priority=low");
            expect(res.status).toBe(200);
            expect(res.body.msg).toBe("filterTask called");
        });
    });

    describe("GET /alltasks", () => {
        it("should call allTasks", async () => {
            const res = await request(app).get("/api/v1/task/alltasks");
            expect(res.status).toBe(200);
            expect(res.body.msg).toBe("allTasks called");
        });
    });

});
