"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invite_controller_1 = require("../controllers/invite.controller");
const router = express_1.default.Router();
router.post('/invite', invite_controller_1.inviteUser);
router.get('/invite', invite_controller_1.getAllInvitedUsers);
router.post('/invite/resend/:uuid', invite_controller_1.resendInvite);
router.put('/invite/role/:uuid', invite_controller_1.updateUserRole);
router.delete('/invite/:uuid', invite_controller_1.deleteInvitedUser);
exports.default = router;
