import { useModelService } from "@/features/model/services/modelService";
import { apiFipe } from "@/services/api";
import { Model } from "@/features/model/types/modelTypes";

jest.mock("@/services/api");

const mockedApi = apiFipe as jest.Mocked<typeof apiFipe>;

describe("useModelService", () => {
  const { getModelsByBrand } = useModelService();

  const mockModels: Model[] = [
    { codigo: "101", nome: "Uno" },
    { codigo: "102", nome: "Palio" },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar a lista de modelos quando a requisição for bem-sucedida", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: { modelos: mockModels } });

    const result = await getModelsByBrand("001");

    expect(mockedApi.get).toHaveBeenCalledWith("/marcas/001/modelos");
    expect(result).toEqual(mockModels);
  });

  it("deve lançar um erro e logar se a resposta falhar", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    mockedApi.get.mockRejectedValueOnce({ response: { status: 404, data: "Não encontrado" } });

    await expect(getModelsByBrand("001")).rejects.toThrow("Erro ao buscar modelos da marca");

    expect(consoleSpy).toHaveBeenCalledWith(
      "Erro ao buscar modelos da marca:",
      expect.objectContaining({ response: { status: 404, data: "Não encontrado" } })
    );

    consoleSpy.mockRestore();
  });

  it("deve lançar um erro se não houver resposta", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    mockedApi.get.mockRejectedValueOnce({ request: {} });

    await expect(getModelsByBrand("001")).rejects.toThrow("Erro ao buscar modelos da marca");

    expect(consoleSpy).toHaveBeenCalledWith(
      "Erro ao buscar modelos da marca:",
      expect.objectContaining({ request: {} })
    );

    consoleSpy.mockRestore();
  });

  it("deve lançar um erro genérico se não for resposta nem requisição", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    mockedApi.get.mockRejectedValueOnce({ message: "Erro desconhecido" });

    await expect(getModelsByBrand("001")).rejects.toThrow("Erro ao buscar modelos da marca");

    expect(consoleSpy).toHaveBeenCalledWith(
      "Erro ao buscar modelos da marca:",
      expect.objectContaining({ message: "Erro desconhecido" })
    );

    consoleSpy.mockRestore();
  });
});
