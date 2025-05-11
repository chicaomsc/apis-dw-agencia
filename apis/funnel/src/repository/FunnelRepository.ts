import { IFunnelRepository } from "./IFunnelRepository";
import { Funnel } from "../models/Funnel";
import { FunnelModel } from "../models/FunnelModel";
import { CreateOrUpdateFunnelDTO } from "../dtos/CreateOrUpdateFunnelDTO";

export class FunnelRepository implements IFunnelRepository {
  async create(funnel: Funnel): Promise<Funnel> {
    const created = await FunnelModel.create({
      user_id: funnel.userId,
      client_id: funnel.clientId,
      step: funnel.step,
      notes: funnel.notes,
      payment_status: funnel.paymentStatus,
      payment_method: funnel.paymentMethod,
      payment_link: funnel.paymentLink,
      payment_qr_code: funnel.paymentQrCode,
      payment_gateway_id: funnel.paymentGatewayId,
    });

    return new Funnel({
      id: created.id,
      userId: created.user_id,
      clientId: created.client_id,
      step: created.step,
      notes: created.notes,
      paymentStatus: created.payment_status,
      paymentMethod: created.payment_method,
      paymentLink: created.payment_link,
      paymentQrCode: created.payment_qr_code,
      paymentGatewayId: created.payment_gateway_id,
      updatedAt: created.updated_at,
    });
  }

  async getByClientId(clientId: string): Promise<Funnel | null> {
    const found = await FunnelModel.findOne({ where: { client_id: clientId } });
    if (!found) return null;

    return new Funnel({
      id: found.id,
      userId: found.user_id,
      clientId: found.client_id,
      step: found.step,
      notes: found.notes,
      paymentStatus: found.payment_status,
      paymentMethod: found.payment_method,
      paymentLink: found.payment_link,
      paymentQrCode: found.payment_qr_code,
      paymentGatewayId: found.payment_gateway_id,
      updatedAt: found.updated_at,
    });
  }

  async update(id: string, data: CreateOrUpdateFunnelDTO): Promise<Funnel> {
    await FunnelModel.update(
      {
        step: data.step,
        notes: data.notes,
        payment_status: data.paymentStatus,
        payment_method: data.paymentMethod,
        payment_link: data.paymentLink,
        payment_qr_code: data.paymentQrCode,
        payment_gateway_id: data.paymentGatewayId,
      },
      { where: { id } }
    );

    const updated = await FunnelModel.findByPk(id);
    if (!updated) throw new Error("Funnel não encontrado após update");

    return new Funnel({
      id: updated.id,
      userId: updated.user_id,
      clientId: updated.client_id,
      step: updated.step,
      notes: updated.notes,
      paymentStatus: updated.payment_status,
      paymentMethod: updated.payment_method,
      paymentLink: updated.payment_link,
      paymentQrCode: updated.payment_qr_code,
      paymentGatewayId: updated.payment_gateway_id,
      updatedAt: updated.updated_at,
    });
  }
}
