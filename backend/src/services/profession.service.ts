import { Profession } from "@prisma/client";
import { IPrismaService, IProfessionService } from "../interfaces";
import { NotFoundError } from "../errors";
import {
  ProfessionWithFreelancerCount,
  ProfessionWithFreelancerCountInputDto,
} from "../dto";
import { MAX_RADIUS_KM } from "../utils/constants";

export class ProfessionService implements IProfessionService {
  constructor(private prismaService: IPrismaService) {}

  async getAllAvailableProfessions(): Promise<Profession[]> {
    return this.prismaService.profession.findMany();
  }

  async getSingleProfession({
    professionId,
  }: {
    professionId: string;
  }): Promise<Profession> {
    return await this.findProfessionByIdOrThrowError({
      professionId,
    });
  }

  async findProfessionByIdOrThrowError({
    professionId,
  }: {
    professionId: string;
  }): Promise<Profession> {
    const profession = await this.prismaService.profession.findUnique({
      where: { id: professionId },
    });

    if (!profession) {
      throw new NotFoundError(`Profession with id ${professionId} not found`);
    }

    return profession;
  }

  async getNearbyProfessionCounts({
    location,
  }: ProfessionWithFreelancerCountInputDto) {
    const latitude = Number(location.latitude);
    const longitude = Number(location.longitude);

    const result = await this.prismaService.$queryRaw<
      ProfessionWithFreelancerCount[]
    >`
    SELECT
    p.id AS profession_id,
    p.name AS profession_name,
    COUNT(DISTINCT f.id)::int AS count
    FROM "FreelancerLocation" fl
    JOIN "Freelancer" f ON f.id = fl."freelancerId"
    JOIN "Profession" p ON p.id = f."primaryProfessionId"
    WHERE
    
  -- 📍 distance filter

  6371 * acos(
    cos(radians(${latitude}))
    * cos(radians(fl.latitude))
    * cos(radians(fl.longitude) - radians(${longitude}))
    + sin(radians(${latitude}))
    * sin(radians(fl.latitude))
  ) <= ${MAX_RADIUS_KM}

  -- 🕒 latest location only

    AND fl."recordedAt" = (
    SELECT MAX(fl2."recordedAt")
    FROM "FreelancerLocation" fl2
    WHERE fl2."freelancerId" = fl."freelancerId"
  )

  -- ✅ approved freelancers only
  
  AND f.status = 'APPROVED'
  GROUP BY p.id, p.name
  ORDER BY count DESC
  LIMIT 6;`;

    return result;
  }
}
