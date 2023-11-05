"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const task_controller_1 = require("./task.controller");
const router = express_1.default.Router();
router.get('/my-tasks', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), task_controller_1.TaskController.getTasks);
router.post('/create-task', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), task_controller_1.TaskController.createTask);
// router.get('/my-tasks', auth(ENUM_USER_ROLE.USER), TaskController.getMyTasks);
router.patch('/update-task/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), task_controller_1.TaskController.updateTask);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), task_controller_1.TaskController.deleteTask);
exports.TaskRoutes = router;
