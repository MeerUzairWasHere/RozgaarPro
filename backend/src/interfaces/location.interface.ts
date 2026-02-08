import { Coordinates } from "../dto";

export interface ILocationService {
  getAddressFromCoordinates(params: Coordinates): Promise<string>;
}
