"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = __importDefault(require("../../../constants/pagination"));
const task_service_1 = require("./task.service");
const task_constants_1 = require("./task.constants");
//! Create Task
const createTask = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield task_service_1.TaskService.createTask(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Task created successfully`,
        data: result,
    });
}));
//! Get Tasks
const getTasks = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, task_constants_1.taskFilterableFields);
    const user = req.user;
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = yield task_service_1.TaskService.getTasks(filters, paginationOptions, user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Task retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
//! Get my boards
const getMyTasks = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield task_service_1.TaskService.getMyTasks(user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'My Tasks retrieved successfully',
        data: result,
    });
}));
//! Update board
const updateTask = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield task_service_1.TaskService.updateTask(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Task updated successfully`,
        data: result,
    });
}));
//! Delete Task
const deleteTask = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield task_service_1.TaskService.deleteTask(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Task deleted successfully',
        data: result,
    });
}));
exports.TaskController = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getMyTasks,
};
