import { Funnel } from "../../models/Funnel";
import { IFunnelRepository } from "../../repository/IFunnelRepository";
import { FunnelService } from "../../services/FunnelService";

const mockRepository: IFunnelRepository = {
  create: jest.fn(),
  getByClientId: jest.fn(),
  update: jest.fn(),
};

describe("FunnelService", () => {
  let funnelService: FunnelService;

  beforeEach(() => {
    funnelService = new FunnelService(mockRepository);
    jest.clearAllMocks();
  });

  it("should create a new funnel if it does not exist", async () => {
    (mockRepository.getByClientId as jest.Mock).mockResolvedValue(null);
    (mockRepository.create as jest.Mock).mockResolvedValue(
      new Funnel({
        id: "1",
        userId: "user-1",
        clientId: "client-1",
        step: "capturado",
      })
    );

    const result = await funnelService.upsertFunnel({
      userId: "user-1",
      clientId: "client-1",
      step: "capturado",
    });

    expect(mockRepository.getByClientId).toHaveBeenCalledWith("client-1");
    expect(mockRepository.create).toHaveBeenCalled();
    expect(result.step).toBe("capturado");
  });

  it("should update funnel if it already exists", async () => {
    const existingFunnel = new Funnel({
      id: "1",
      userId: "user-1",
      clientId: "client-1",
      step: "capturado",
    });

    (mockRepository.getByClientId as jest.Mock).mockResolvedValue(
      existingFunnel
    );
    (mockRepository.update as jest.Mock).mockResolvedValue(
      new Funnel({
        id: "1",
        userId: "user-1",
        clientId: "client-1",
        step: "orçamento solicitado",
      })
    );

    const result = await funnelService.upsertFunnel({
      userId: "user-1",
      clientId: "client-1",
      step: "orçamento solicitado",
    });

    expect(mockRepository.update).toHaveBeenCalledWith("1", expect.any(Object));
    expect(result.step).toBe("orçamento solicitado");
  });
});
