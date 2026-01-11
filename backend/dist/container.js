"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageService = exports.companyController = exports.userController = exports.authController = exports.companyService = exports.userService = exports.authService = exports.emailService = exports.companyRepository = exports.userRepository = exports.prismaService = exports.container = void 0;
const auth_controller_1 = require("./controllers/auth.controller");
const company_controller_1 = require("./controllers/company.controller");
const user_controller_1 = require("./controllers/user.controller");
const repositories_1 = require("./repositories");
const services_1 = require("./services");
// Container to hold all instances
class Container {
    constructor() {
        // Initialize Database
        this.prismaService = new services_1.PrismaService();
        this.storageService = (0, services_1.createStorageService)();
        // Initialize Repositories
        this.userRepository = new repositories_1.UserRepository(this.prismaService);
        this.companyRepository = new repositories_1.CompanyRepository(this.prismaService);
        // Initialize Services
        this.companyService = new services_1.CompanyService(this.companyRepository);
        this.emailService = new services_1.EmailService(process.env.EMAIL_SERVICE_API_KEY, this.companyService);
        this.authService = new services_1.AuthService(this.emailService, this.userRepository, this.companyService);
        this.userService = new services_1.UserService(this.userRepository);
        // Initialize Controllers
        this.authController = new auth_controller_1.AuthController(this.authService);
        this.userController = new user_controller_1.UserController(this.userService);
        this.companyController = new company_controller_1.CompanyController(this.companyService);
    }
}
// Export singleton instance
exports.container = new Container();
// Export individual instances for convenience
exports.prismaService = exports.container.prismaService, exports.userRepository = exports.container.userRepository, exports.companyRepository = exports.container.companyRepository, exports.emailService = exports.container.emailService, exports.authService = exports.container.authService, exports.userService = exports.container.userService, exports.companyService = exports.container.companyService, exports.authController = exports.container.authController, exports.userController = exports.container.userController, exports.companyController = exports.container.companyController, exports.storageService = exports.container.storageService;
