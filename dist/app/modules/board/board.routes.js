"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = require("../../middlewares/validateRequest");
const board_controller_1 = require("./board.controller");
const board_validations_1 = require("./board.validations");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), board_controller_1.BoardController.getBoards);
router.get('/my-boards', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), board_controller_1.BoardController.getMyBoards);
router.post('/create-board', (0, validateRequest_1.validateRequest)(board_validations_1.BoardValidation.create), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), board_controller_1.BoardController.createBoard);
router.patch('/update-board/:id', (0, validateRequest_1.validateRequest)(board_validations_1.BoardValidation.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), board_controller_1.BoardController.updateBoard);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), board_controller_1.BoardController.deleteBoard);
exports.BoardRoutes = router;
