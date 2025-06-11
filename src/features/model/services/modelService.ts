import { apiFipe } from "@/services/api";
import { Model, ModelResponse } from "../types/modelTypes";

export const useModelService = () => {
    const getModelsByBrand = async (brandId: string): Promise<Model[]> => {
        try {
            const response = await apiFipe.get<ModelResponse>(`/marcas/${brandId}/modelos`);
            return response.data.modelos;
        } catch (error) {
            console.error("Erro ao buscar modelos da marca:", error);
            throw new Error("Erro ao buscar modelos da marca");
        }
    };

    return { getModelsByBrand };
};
