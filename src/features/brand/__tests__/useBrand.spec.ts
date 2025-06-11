import { renderHook, waitFor } from "@testing-library/react";
import { useBrands } from "../hooks/useBrands";
import { useBrandService } from "../services/brandService";
import { Brand } from "../types/brandTypes";

// Mock do service
jest.mock("../services/brandService");

const mockBrands: Brand[] = [
  { codigo: "001", nome: "Fiat" },
  { codigo: "002", nome: "Chevrolet" },
];

describe("useBrands", () => {
  it("deve buscar as marcas e atualizar o estado corretamente", async () => {
    // Mock do retorno do service
    const getBrandsMock = jest.fn().mockResolvedValueOnce(mockBrands);
    (useBrandService as jest.Mock).mockReturnValue({ getBrands: getBrandsMock });

    const { result } = renderHook(() => useBrands());

    // Espera até que loading seja falso
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Verifica se as marcas foram setadas
    expect(result.current.brands).toEqual(mockBrands);
    expect(getBrandsMock).toHaveBeenCalled();
  });

  it("deve lidar com erro na requisição e continuar com loading = false", async () => {
    const error = new Error("Falha na API");
    const getBrandsMock = jest.fn().mockRejectedValueOnce(error);
    (useBrandService as jest.Mock).mockReturnValue({ getBrands: getBrandsMock });

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    const { result } = renderHook(() => useBrands());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.brands).toEqual([]);
    expect(getBrandsMock).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(error);

    consoleSpy.mockRestore();
  });
});
