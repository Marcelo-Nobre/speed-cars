import { renderHook, waitFor } from "@testing-library/react";
import { useModels } from "../hooks/useModels";
import { useModelService } from "../services/modelService";
import { Model } from "../types/modelTypes";

jest.mock("../services/modelService");

const mockModels: Model[] = [
  { codigo: "101", nome: "Uno" },
  { codigo: "102", nome: "Palio" },
];

describe("useModels", () => {
  it("deve buscar os modelos e atualizar o estado corretamente", async () => {
    const getModelsByBrandMock = jest.fn().mockResolvedValueOnce(mockModels);
    (useModelService as jest.Mock).mockReturnValue({ getModelsByBrand: getModelsByBrandMock });

    const { result } = renderHook(() => useModels("001"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.models).toEqual(mockModels);
    expect(getModelsByBrandMock).toHaveBeenCalledWith("001");
  });

  it("deve lidar com erro na requisição e continuar com loading = false", async () => {
    const error = new Error("Falha na API");
    const getModelsByBrandMock = jest.fn().mockRejectedValueOnce(error);
    (useModelService as jest.Mock).mockReturnValue({ getModelsByBrand: getModelsByBrandMock });

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    const { result } = renderHook(() => useModels("001"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.models).toEqual([]);
    expect(getModelsByBrandMock).toHaveBeenCalledWith("001");
    expect(consoleSpy).toHaveBeenCalledWith(error);

    consoleSpy.mockRestore();
  });
});
