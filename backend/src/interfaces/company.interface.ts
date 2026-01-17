import { CompanyCreateInputDto } from "../dto";
import { Company } from "@prisma/client";

export interface ICompanyService {
  createCompany(params: CompanyCreateInputDto): Promise<Company>;
  getCompany(): Promise<Company | null>;
  deleteCompany(): Promise<void>;
}
