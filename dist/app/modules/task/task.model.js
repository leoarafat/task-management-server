"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Todo', 'Doing', 'Done'],
        default: 'Todo',
    },
    board: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Board',
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    assignedUsers: [
        {
            type: String,
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Task = (0, mongoose_1.model)('Task', TaskSchema);
