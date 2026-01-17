import { Company } from "@prisma/client";
import { CompanyCreateInputDto } from "../dto";
import { ConflictError } from "../errors";
import { ICompanyService, IPrismaService } from "../interfaces";

export class CompanyService implements ICompanyService {
  constructor(private prismaService: IPrismaService) {}

  async createCompany(data: CompanyCreateInputDto) {
    const companyAlreadyExists = await this.prismaService.company.findFirst();

    if (companyAlreadyExists) {
      throw new ConflictError("Company already exists");
    }

    const company = await this.prismaService.company.create({
      data,
    });

    return company;
  }

  async getCompany(): Promise<Company | null> {
    const company = await this.prismaService.company.findFirst();

    return company;
  }

  async deleteCompany() {
    await this.prismaService.company.deleteMany();
    return;
  }
}
