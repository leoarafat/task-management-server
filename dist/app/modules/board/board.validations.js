"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardValidation = void 0;
const zod_1 = require("zod");
const board_constants_1 = require("./board.constants");
const create = zod_1.z.object({
    body: zod_1.z.object({
        boardName: zod_1.z.string({
            required_error: 'boardName  is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        boardName: zod_1.z.string({}).optional(),
        boardColumns: zod_1.z
            .enum([...Object.values(board_constants_1.BoardEnum)])
            .optional(),
    }),
});
exports.BoardValidation = {
    create,
    update,
};
