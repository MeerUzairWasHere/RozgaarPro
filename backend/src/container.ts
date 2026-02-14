import {
  AuthController,
  CompanyController,
  FreelancerController,
  ProfessionController,
  SkillController,
  UserController,
} from "./controllers";

import { VerifyProvider } from "./interfaces";

import {
  AuthService,
  CompanyService,
  EmailService,
  FreelancerService,
  LocationService,
  PrismaService,
  ProfessionService,
  RekognitionService,
  S3StorageService,
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
  public rekognitionService: RekognitionService;
  public storageService: S3StorageService;
  public verifyProvider: VerifyProvider;
  public authService: AuthService;
  public userService: UserService;
  public companyService: CompanyService;
  public skillService: SkillService;
  public professionService: ProfessionService;
  public freelancerService: FreelancerService;
  public locationService: LocationService;

  // Controllers
  public authController: AuthController;
  public userController: UserController;
  public companyController: CompanyController;
  public skillController: SkillController;
  public professionController: ProfessionController;
  public freelancerController: FreelancerController;

  constructor() {
    // Initialize Database
    this.prismaService = new PrismaService();
    this.locationService = new LocationService();
    this.rekognitionService = new RekognitionService();
    this.storageService = new S3StorageService();

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
    this.professionService = new ProfessionService(this.prismaService);
    this.skillService = new SkillService(
      this.prismaService,
      this.professionService,
    );
    this.freelancerService = new FreelancerService(
      this.prismaService,
      this.userService,
      this.locationService,
      this.rekognitionService,
      this.storageService,
    );

    // Initialize Controllers
    this.authController = new AuthController(this.authService);
    this.skillController = new SkillController(this.skillService);
    this.professionController = new ProfessionController(
      this.professionService,
    );
    this.userController = new UserController(this.userService);
    this.companyController = new CompanyController(this.companyService);
    this.freelancerController = new FreelancerController(
      this.freelancerService,
    );
  }
}

// Export singleton instance
export const container = new Container();

// Export individual instances for convenience
export const {
  prismaService,
  authController,
  userController,
  companyController,
  skillController,
  freelancerController,
  professionController,
} = container;
