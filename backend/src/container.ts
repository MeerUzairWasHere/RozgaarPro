import {
  AuthController,
  CompanyController,
  SkillController,
  UserController,
} from "./controllers";
import { FreelancerController } from "./controllers/freelancer.controller";

import { IStorageService, VerifyProvider } from "./interfaces";

import {
  AuthService,
  CompanyService,
  createStorageService,
  EmailService,
  FreelancerService,
  PrismaService,
  SkillService,
  TwilioVerifyService,
  UserService,
} from "./services";

// Container to hold all instances
class Container {
  // Database
  public prismaService: PrismaService;

  // Services
  public emailService: EmailService;
  public storageService: IStorageService;
  public verifyProvider: VerifyProvider;
  public authService: AuthService;
  public userService: UserService;
  public companyService: CompanyService;
  public skillService: SkillService;
  public freelancerService: FreelancerService;

  // Controllers
  public authController: AuthController;
  public userController: UserController;
  public companyController: CompanyController;
  public skillController: SkillController;
  public freelancerController: FreelancerController;

  constructor() {
    // Initialize Database
    this.prismaService = new PrismaService();
    this.storageService = createStorageService();

    // Initialize Services
    this.companyService = new CompanyService(this.prismaService);
    this.emailService = new EmailService(
      process.env.EMAIL_SERVICE_API_KEY!,
      this.companyService,
    );
    this.verifyProvider = new TwilioVerifyService();
    this.authService = new AuthService(
      this.emailService,
      this.prismaService,
      this.companyService,
      this.verifyProvider,
    );
    this.userService = new UserService(this.prismaService);
    this.skillService = new SkillService(this.prismaService);
    this.freelancerService = new FreelancerService(
      this.prismaService,
      this.userService,
    );

    // Initialize Controllers
    this.authController = new AuthController(this.authService);
    this.skillController = new SkillController(this.skillService);
    this.userController = new UserController(this.userService);
    this.companyController = new CompanyController(this.companyService);
    this.freelancerController = new FreelancerController(
      this.freelancerService,
      this.userService,
    );
  }
}

// Export singleton instance
export const container = new Container();

// Export individual instances for convenience
export const {
  prismaService,
  emailService,
  authService,
  userService,
  companyService,
  authController,
  userController,
  companyController,
  storageService,
  skillController,
  freelancerController,
} = container;
