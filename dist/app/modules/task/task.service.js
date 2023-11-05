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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const Apierror_1 = __importDefault(require("../../../errors/Apierror"));
const task_model_1 = require("../task/task.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const task_constants_1 = require("./task.constants");
const board_model_1 = require("../board/board.model");
//! Create task
const createTask = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const boardId = payload.board;
    const board = yield board_model_1.Board.findById(boardId);
    // console.log(board);
    if (!board) {
        throw new Apierror_1.default(404, 'board not found');
    }
    const result = (yield task_model_1.Task.create(payload)).populate('board');
    //@ts-ignore
    (_a = board === null || board === void 0 ? void 0 : board.tasks) === null || _a === void 0 ? void 0 : _a.push((yield result)._id);
    yield board.save();
    return result;
});
//! Get Task
const getTasks = (filters, paginationOptions, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    console.log(user);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: task_constants_1.taskSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    if (user && (user === null || user === void 0 ? void 0 : user.userId)) {
        andConditions.push({ user: user === null || user === void 0 ? void 0 : user.userId });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield task_model_1.Task.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate('board');
    const total = yield task_model_1.Task.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
//! Get my tasks
const getMyTasks = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_model_1.Task.find({ user: user === null || user === void 0 ? void 0 : user.userId }).populate('board');
    if (!tasks) {
        throw new Apierror_1.default(404, 'tasks not found');
    }
    return tasks;
});
//!Update Task
const updateTask = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield task_model_1.Task.findById({ _id: id });
    if (!isExist) {
        throw new Apierror_1.default(404, 'Task does not found');
    }
    const updatedTaskData = Object.assign({}, payload);
    const result = yield task_model_1.Task.findOneAndUpdate({
        _id: id,
    }, updatedTaskData, {
        new: true,
    });
    return result;
});
//! Delete Task
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.Task.findByIdAndDelete({ _id: id });
    //   console.log(Task);
    if (!task) {
        throw new Apierror_1.default(404, 'Task not found');
    }
});
exports.TaskService = {
    createTask,
    updateTask,
    deleteTask,
    getTasks,
    getMyTasks,
};
