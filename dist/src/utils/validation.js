"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePostData = validatePostData;
const notifications_1 = require("./notifications");
function validatePostData(data) {
    if (!data.title || data.title.length < 3) {
        (0, notifications_1.showToast)('Title must be at least 3 characters long', 'error');
        return false;
    }
    if (!data.content || data.content.length < 10) {
        (0, notifications_1.showToast)('Content must be at least 10 characters long', 'error');
        return false;
    }
    if (!data.author) {
        (0, notifications_1.showToast)('Author name is required', 'error');
        return false;
    }
    return true;
}
