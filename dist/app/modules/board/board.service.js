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
exports.BoardService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const Apierror_1 = __importDefault(require("../../../errors/Apierror"));
const task_model_1 = require("../task/task.model");
const board_model_1 = require("./board.model");
const forEach_1 = require("../../../shared/forEach");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const board_constants_1 = require("./board.constants");
//! Create board
const createBoard = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardName, user } = payload;
    const isExist = yield board_model_1.Board.findOne({ boardName, user });
    if (isExist) {
        throw new Apierror_1.default(400, 'Already Exist this board');
    }
    const result = (yield board_model_1.Board.create(payload)).populate('user');
    return result;
});
//! Get Boards
const getBoards = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: board_constants_1.boardSearchableFields.map(field => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield board_model_1.Board.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield board_model_1.Board.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
//! Get my boards
const getMyBoards = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const board = yield board_model_1.Board.find({ user: user === null || user === void 0 ? void 0 : user.userId });
    if (!board) {
        throw new Apierror_1.default(404, 'Board not found');
    }
    return board;
});
//!Update Board
const updateBoard = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield board_model_1.Board.findById({ _id: id });
    if (!isExist) {
        throw new Apierror_1.default(404, 'Board does not found');
    }
    const updatedBoardData = Object.assign({}, payload);
    const result = yield board_model_1.Board.findOneAndUpdate({
        _id: id,
    }, updatedBoardData, {
        new: true,
    });
    return result;
});
//! Delete board
const deleteBoard = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const board = yield board_model_1.Board.findByIdAndDelete({ _id: id });
    //   console.log(board);
    if (!board) {
        throw new Apierror_1.default(404, 'Board not found');
    }
    const tasks = yield task_model_1.Task.find({ board: id });
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        yield (0, forEach_1.asyncForEach)(tasks, (data) => __awaiter(void 0, void 0, void 0, function* () {
            yield task_model_1.Task.deleteMany({ board: data.board });
        }));
        yield board_model_1.Board.findByIdAndDelete({ _id: id });
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        console.log(error);
        throw error;
    }
});
exports.BoardService = {
    createBoard,
    updateBoard,
    deleteBoard,
    getBoards,
    getMyBoards,
};
