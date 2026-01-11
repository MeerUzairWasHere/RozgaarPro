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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
// Routers
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const company_routes_1 = __importDefault(require("./routes/company.routes"));
// Middleware
const container_1 = require("./container");
const filters_1 = require("./filters");
// const __dirname = dirname(fileURLToPath(import.meta.url)); // Uncomment if you have a frontend
// Initialize Express app
const app = (0, express_1.default)();
// Middleware setup
app.use(express_1.default.json());
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.use("/uploads", express_1.default.static("uploads"));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
// app.use(express.static(resolve(__dirname, "./client/dist"))); // Uncomment if you have a frontend
// Security
app.set("trust proxy", 1);
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (req, res, next, options) => {
        // Pass a custom error object to the next middleware
        const err = new Error("Too many requests. Please try again later.");
        // Attach useful info
        err.statusCode = 429;
        err.retryAfter = options.windowMs / 1000 / 60 + " minutes";
        next(err);
    },
}));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
// Routes
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/company", company_routes_1.default);
app.use("/api/v1/users", user_routes_1.default);
// app.get("*", (req, res) => {
//   // res.redirect("/documentation"); // comment out this route when starting
// });
// Serve static files in production
// Uncomment the below line if you have a frontend to serve in production
// app.get("*", (req: Request, res: Response) => {
//     res.sendFile(resolve(__dirname, "./client/dist", "index.html"));
// });
app.use(filters_1.notFoundFilter); // 404 errors
app.use(filters_1.zodExceptionFilter); // Zod validation errors
app.use(filters_1.jwtExceptionFilter); // JWT token errors
app.use(filters_1.prismaExceptionFilter); // Prisma database errors
app.use(filters_1.rateLimitExceptionFilter); // Rate limiting errors
app.use(filters_1.httpExceptionFilter); // HTTP errors
// Port
const port = process.env.PORT || 3000;
// Start the server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield container_1.prismaService.connect();
        app.listen(port, () => {
            console.log(`Server is listening on http://localhost:${port}/...`);
        });
    }
    catch (error) {
        console.error(error);
        yield container_1.prismaService.disconnect();
    }
});
startServer();
