import { useEffect, useState } from "react";
import { useBrandService } from "../services/brandService";
import { Brand } from "../types/brandTypes";
import { Alert } from "react-native";

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
        Alert.alert("Erro", "Não foi possível carregar as marcas de carro.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { brands, loading };
}
