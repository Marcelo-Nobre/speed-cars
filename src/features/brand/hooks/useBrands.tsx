import { useEffect, useState } from "react";
import { useBrandService } from "../services/brandService";
import { Brand } from "../types/brandTypes";

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const { getBrands } = useBrandService();

  useEffect(() => {
    (async () => {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { brands, loading };
}
