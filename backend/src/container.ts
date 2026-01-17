import {
  AuthController,
  CompanyController,
  SkillController,
  UserController,
} from "./controllers";

import { IStorageService, VerifyProvider } from "./interfaces";

import {
  CompanyRepository,
  SkillRepository,
  UserRepository,
} from "./repositories";

import {
  AuthService,
  CompanyService,
  createStorageService,
  EmailService,
  PrismaService,
  SkillService,
  TwilioVerifyService,
  UserService,
} from "./services";

// Container to hold all instances
class Container {
  // Database
  public prismaService: PrismaService;

  // Repositories
  public userRepository: UserRepository;
  public companyRepository: CompanyRepository;
  public skillRepository: SkillRepository;

  // Services
  public emailService: EmailService;
  public storageService: IStorageService;
  public verifyProvider: VerifyProvider;

  public authService: AuthService;
  public userService: UserService;
  public companyService: CompanyService;
  public skillService: SkillService;

  // Controllers
  public authController: AuthController;
  public userController: UserController;
  public companyController: CompanyController;
  public skillController: SkillController;

  constructor() {
    // Initialize Database
    this.prismaService = new PrismaService();
    this.storageService = createStorageService();

    // Initialize Repositories
    this.userRepository = new UserRepository(this.prismaService);
    this.companyRepository = new CompanyRepository(this.prismaService);
    this.skillRepository = new SkillRepository(this.prismaService);

    // Initialize Services
    this.companyService = new CompanyService(this.companyRepository);
    this.emailService = new EmailService(
      process.env.EMAIL_SERVICE_API_KEY!,
      this.companyService,
    );
    this.verifyProvider = new TwilioVerifyService();

    this.authService = new AuthService(
      this.emailService,
      this.userRepository,
      this.companyService,
      this.verifyProvider,
    );

    this.skillService = new SkillService(this.skillRepository);
    this.userService = new UserService(this.userRepository);

    // Initialize Controllers
    this.authController = new AuthController(this.authService);
    this.skillController = new SkillController(this.skillService);
    this.userController = new UserController(this.userService);
    this.companyController = new CompanyController(this.companyService);
  }
}

// Export singleton instance
export const container = new Container();

// Export individual instances for convenience
export const {
  prismaService,
  userRepository,
  companyRepository,
  emailService,
  authService,
  userService,
  companyService,
  authController,
  userController,
  companyController,
  storageService,
  skillController,
} = container;
