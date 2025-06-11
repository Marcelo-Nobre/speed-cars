import { useBrandService } from "@/features/brand/services/brandService";
import { apiFipe } from "@/services/api";
import { Brand } from "@/features/brand/types/brandTypes";

jest.mock("@/services/api");

const mockedApi = apiFipe as jest.Mocked<typeof apiFipe>;

describe("useBrandService", () => {
  const { getBrands } = useBrandService();

  const mockBrands: Brand[] = [
    { codigo: "001", nome: "Fiat" },
    { codigo: "002", nome: "Volkswagen" },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar a lista de marcas quando a requisição for bem-sucedida", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: mockBrands });

    const result = await getBrands();

    expect(mockedApi.get).toHaveBeenCalledWith("/marcas");
    expect(result).toEqual(mockBrands);
  });

  it("deve lançar um erro e logar no console se a resposta falhar", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    mockedApi.get.mockRejectedValueOnce({ response: { status: 500, data: "Erro interno" } });

    await expect(getBrands()).rejects.toThrow("Erro ao buscar marcas de carro");

    expect(consoleSpy).toHaveBeenCalledWith("Erro de resposta HTTP:", 500, "Erro interno");

    consoleSpy.mockRestore();
  });

  it("deve lançar um erro se não houver resposta", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    mockedApi.get.mockRejectedValueOnce({ request: {} });

    await expect(getBrands()).rejects.toThrow("Erro ao buscar marcas de carro");

    expect(consoleSpy).toHaveBeenCalledWith("Erro na requisição (sem resposta):", {});

    consoleSpy.mockRestore();
  });

  it("deve lançar um erro genérico se não for resposta nem requisição", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    mockedApi.get.mockRejectedValueOnce({ message: "Erro genérico" });

    await expect(getBrands()).rejects.toThrow("Erro ao buscar marcas de carro");

    expect(consoleSpy).toHaveBeenCalledWith("Erro geral:", "Erro genérico");

    consoleSpy.mockRestore();
  });
});
