import { Funnel } from "../models/Funnel";
import { CreateOrUpdateFunnelDTO } from "../dtos/CreateOrUpdateFunnelDTO";

export interface IFunnelService {
  upsertFunnel(data: CreateOrUpdateFunnelDTO): Promise<Funnel>;
  getFunnelByClientId(clientId: string): Promise<Funnel | null>;
}
