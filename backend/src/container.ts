import {
  AuthController,
  CompanyController,
  ConversationController,
  ReviewController,
  FreelancerController,
  LocationController,
  ProfessionController,
  SkillController,
  UserController,
} from "./controllers";

import { VerifyProvider } from "./interfaces";

import {
  AuthService,
  CompanyService,
  ConversationService,
  EmailService,
  FreelancerService,
  ImageService,
  LocationService,
  PrismaService,
  ProfessionService,
  ProfileImageService,
  RekognitionService,
  S3StorageService,
  SkillService,
  TwilioVerifyService,
  UserService,
  ReviewService,
} from "./services";

// Container to hold all instances
class Container {
  // Database
  public prismaService: PrismaService;

  // Services
  public emailService: EmailService;
  public profileImageService: ProfileImageService;
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
  public imageService: ImageService;
  public conversationService: ConversationService;
  public reviewService: ReviewService;

  // Controllers
  public authController: AuthController;
  public userController: UserController;
  public companyController: CompanyController;
  public skillController: SkillController;
  public locationController: LocationController;
  public professionController: ProfessionController;
  public freelancerController: FreelancerController;
  public conversationController: ConversationController;
  public reviewController: ReviewController;

  constructor() {
    // Initialize Database
    this.prismaService = new PrismaService();
    this.locationService = new LocationService();
    this.rekognitionService = new RekognitionService();
    this.storageService = new S3StorageService();
    this.imageService = new ImageService(process.env.IMAGE_API_KEY!);
    this.profileImageService = new ProfileImageService(
      this.rekognitionService,
      this.imageService,
      this.storageService,
    );

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
      this.storageService,
      this.profileImageService,
    );
    this.conversationService = new ConversationService(
      this.prismaService,
      this.storageService,
    );
    this.reviewService = new ReviewService(
      this.prismaService,
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
    this.locationController = new LocationController(this.locationService);
    this.conversationController = new ConversationController(
      this.conversationService,
    );
    this.reviewController = new ReviewController(this.reviewService);
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
  locationController,
  conversationController,
  reviewController,
} = container;
