import { useEffect, useState } from "react";
import { useModelService } from "../services/modelService";
import { Model } from "../types/modelTypes";

export function useModels(brandId: string) {
    const [models, setModels] = useState<Model[]>([]);
    const [loading, setLoading] = useState(true);
    const { getModelsByBrand } = useModelService();

    useEffect(() => {
        (async () => {
            try {
                const data = await getModelsByBrand(brandId);
                setModels(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [brandId]);

    return { models, loading };
}
