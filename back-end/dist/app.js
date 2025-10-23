"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Core Modules :
const path_1 = __importDefault(require("path"));
// Third Modules :
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// Local Modules :
// Route Modules :
const auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, ".env") });
const app = (0, express_1.default)();
// Global Middlewares :
app.use(express_1.default.json());
// Routes :
app.use("/auth", auth_1.default);
// Server run :
app.listen(process.env.port, () => console.log(`Server run on port ${process.env.port}`));
//# sourceMappingURL=app.js.map