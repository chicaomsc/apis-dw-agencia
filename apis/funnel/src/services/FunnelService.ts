import { CreateOrUpdateFunnelDTO } from "../dtos/CreateOrUpdateFunnelDTO";
import { Funnel } from "../models/Funnel";
import { IFunnelRepository } from "../repository/IFunnelRepository";

export class FunnelService {
  private funnelRepository: IFunnelRepository;

  constructor(funnelRepository: IFunnelRepository) {
    this.funnelRepository = funnelRepository;
  }

  async upsertFunnel(data: CreateOrUpdateFunnelDTO): Promise<Funnel> {
    // Busca funil existente por client_id
    const existingFunnel = await this.funnelRepository.getByClientId(
      data.clientId
    );

    if (existingFunnel) {
      const updated = await this.funnelRepository.update(
        existingFunnel.id!,
        data
      );
      return updated;
    } else {
      // Cria um novo funil
      const funnel = new Funnel(data);
      return await this.funnelRepository.create(funnel);
    }
  }

  async getFunnelByClientId(clientId: string): Promise<Funnel | null> {
    return await this.funnelRepository.getByClientId(clientId);
  }
}
