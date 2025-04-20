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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeAdminDashboard = initializeAdminDashboard;
/**
 * Admin Controller for managing blog posts and dashboard functionality
 */
const state_1 = require("./state");
const eventListeners_1 = require("./events/eventListeners");
const postManager_1 = require("./postManager");
const notifications_1 = require("../utils/notifications");
function initializeAdminDashboard() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (state_1.state.initialized) {
                return;
            }
            state_1.state.loading = true;
            (0, eventListeners_1.setupEventListeners)();
            yield (0, postManager_1.loadPosts)();
            state_1.state.initialized = true;
        }
        catch (error) {
            (0, notifications_1.showToast)('Failed to initialize dashboard', 'error');
            console.error('Dashboard initialization error:', error);
        }
        finally {
            state_1.state.loading = false;
        }
    });
}
