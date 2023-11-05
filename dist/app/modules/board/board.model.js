"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const mongoose_1 = require("mongoose");
const board_constants_1 = require("./board.constants");
// room Schema
const BoardSchema = new mongoose_1.Schema({
    boardName: {
        type: String,
        require: true,
    },
    boardColumns: {
        type: String,
        enum: board_constants_1.BoardEnum,
        require: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tasks: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Task',
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Board = (0, mongoose_1.model)('Board', BoardSchema);
