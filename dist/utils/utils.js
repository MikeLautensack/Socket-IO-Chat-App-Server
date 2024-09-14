"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genId = genId;
function genId() {
    return Math.floor(10000000 + Math.random() * 90000000);
}
