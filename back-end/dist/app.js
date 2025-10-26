"use strict";
// Core Modules :
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Third Modules :
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// Local Modules :
// Route Modules :
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Global Middlewares :
app.use(express_1.default.json());
app.use((err, req, res, next) => {
    switch (err.status) {
        case 400: {
            return res.status(400).send("Request body is invalid");
        }
        default: {
            return res.status(500).send({ message: "Server error", error: err.message });
        }
    }
});
// Routes :
app.use("/auth", auth_1.default);
app.use("/users", users_1.default);
// Not found route :
app.use(async (req, res) => {
    res.status(404).send("API route not found");
});
// Server run :
app.listen(process.env.port, () => console.log(`Server run on port ${process.env.port}`));
//# sourceMappingURL=app.js.map