"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class InvitedUser extends sequelize_1.Model {
}
InvitedUser.init({
    uuid: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    name: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    role: sequelize_1.DataTypes.STRING,
    project: sequelize_1.DataTypes.STRING,
    action: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'pending'
    },
    invitedAt: sequelize_1.DataTypes.DATE
}, {
    sequelize: database_1.default,
    modelName: 'InvitedUser',
    tableName: 'invited_users',
    timestamps: true
});
exports.default = InvitedUser;
