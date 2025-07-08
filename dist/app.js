"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Invite_route_1 = __importDefault(require("./routes/Invite.route"));
const Project_route_1 = __importDefault(require("./routes/Project.route"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', Invite_route_1.default);
app.use('/api', Project_route_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
database_1.default.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
