import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { ILocationService } from "../interfaces";
import { getBody } from "../decorators";

export class LocationController {
  constructor(private locationService: ILocationService) {}

  public getAddressFromCoordinates = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const coords = getBody(req).location;

    const result = await this.locationService.getAddressFromCoordinates(
      coords!,
    );

    res.status(StatusCodes.OK).json(result);
  };
}
