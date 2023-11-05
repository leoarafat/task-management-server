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
exports.BoardController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const board_service_1 = require("./board.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const board_constants_1 = require("./board.constants");
const pagination_1 = __importDefault(require("../../../constants/pagination"));
//! Create Board
const createBoard = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield board_service_1.BoardService.createBoard(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Board created successfully`,
        data: result,
    });
}));
//! Get boards
const getBoards = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, board_constants_1.boardFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.default);
    const result = yield board_service_1.BoardService.getBoards(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Board retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
//! Get my boards
const getMyBoards = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield board_service_1.BoardService.getMyBoards(user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'My Board retrieved successfully',
        data: result,
    });
}));
//! Update board
const updateBoard = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield board_service_1.BoardService.updateBoard(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Board updated successfully`,
        data: result,
    });
}));
//! Delete Board
const deleteBoard = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield board_service_1.BoardService.deleteBoard(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Board deleted successfully',
        data: result,
    });
}));
exports.BoardController = {
    createBoard,
    getBoards,
    updateBoard,
    deleteBoard,
    getMyBoards,
};
