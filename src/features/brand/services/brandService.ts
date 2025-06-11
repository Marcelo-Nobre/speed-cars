import { apiFipe } from "@/services/api";

export type Brand = {
    codigo: string;
    nome: string;
};

export const useBrandService = () => {
    const getBrands = async (): Promise<Brand[]> => {
        try {
            const response = await apiFipe.get("/marcas");
            return response.data;
        } catch (error: any) {
            if (error.response) {
                console.error("Erro de resposta HTTP:", error.response.status, error.response.data);
            } else if (error.request) {
                console.error("Erro na requisição (sem resposta):", error.request);
            } else {
                console.error("Erro geral:", error.message);
            }
            throw new Error("Erro ao buscar marcas de carro");
        }

    };

    return { getBrands };
};
