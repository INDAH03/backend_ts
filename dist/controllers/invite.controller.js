"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInvitedUser = exports.updateInvitedUser = exports.resendInvite = exports.getAllInvitedUsers = exports.inviteUser = void 0;
const InvitedUser_1 = __importDefault(require("../models/InvitedUser"));
const inviteUser = async (req, res) => {
    const { email, role, project } = req.body;
    const generateNameFromEmail = (email) => {
        const prefix = email.split('@')[0];
        return prefix
            .split(/[._-]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    const name = generateNameFromEmail(email);
    try {
        const user = await InvitedUser_1.default.create({
            name,
            email,
            role,
            project,
            invitedAt: new Date()
        });
        res.status(201).json(user);
    }
    catch (err) {
        console.error('Invite Error:', err);
        res.status(500).json({ message: 'Invite failed', error: err });
    }
};
exports.inviteUser = inviteUser;
const getAllInvitedUsers = async (_req, res) => {
    const users = await InvitedUser_1.default.findAll();
    res.json(users);
};
exports.getAllInvitedUsers = getAllInvitedUsers;
const resendInvite = async (req, res) => {
    const { uuid } = req.params;
    try {
        const user = await InvitedUser_1.default.findByPk(uuid);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: `Invite resent to ${user.email}` });
    }
    catch (err) {
        res.status(500).json({ message: 'Resend failed', error: err });
    }
};
exports.resendInvite = resendInvite;
// invite.controller.ts
const updateInvitedUser = async (req, res) => {
    const { uuid } = req.params;
    console.log('Incoming update payload:', req.body);
    const { name, email, role } = req.body;
    try {
        const user = await InvitedUser_1.default.findByPk(uuid);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // hanya update field yang ada
        if (name !== undefined)
            user.name = name;
        if (email !== undefined)
            user.email = email;
        if (role !== undefined)
            user.role = role;
        await user.save();
        res.json(user);
    }
    catch (err) {
        console.error('Update failed:', err);
        res.status(500).json({ message: 'Update user failed', error: err });
    }
};
exports.updateInvitedUser = updateInvitedUser;
const deleteInvitedUser = async (req, res) => {
    const { uuid } = req.params;
    try {
        const deleted = await InvitedUser_1.default.destroy({ where: { uuid } });
        if (!deleted) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Delete failed', error: err });
    }
};
exports.deleteInvitedUser = deleteInvitedUser;
