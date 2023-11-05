"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validations_1 = require("./user.validations");
const router = express_1.default.Router();
//!
router.post('/signup', (0, validateRequest_1.validateRequest)(user_validations_1.UserValidation.create), user_controller_1.UserController.createUser);
//!
router.get('/', user_controller_1.UserController.getUsers);
router.get('/:id', user_controller_1.UserController.getSingleUser);
//!
router.patch('/edit-profile/:id', (0, validateRequest_1.validateRequest)(user_validations_1.UserValidation.updateUserZodSchema), 
// auth(ENUM_USER_ROLE.USER),
user_controller_1.UserController.updateUser);
//!
router.delete('/:id', 
//  auth(ENUM_USER_ROLE.USER),
user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
