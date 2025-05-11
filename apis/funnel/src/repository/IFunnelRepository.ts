import { CreateOrUpdateFunnelDTO } from "../dtos/CreateOrUpdateFunnelDTO";
import { Funnel } from "../models/Funnel";

export interface IFunnelRepository {
  create(funnel: Funnel): Promise<Funnel>;
  getByClientId(clientId: string): Promise<Funnel | null>;
  update(id: string, data: CreateOrUpdateFunnelDTO): Promise<Funnel>;
}
