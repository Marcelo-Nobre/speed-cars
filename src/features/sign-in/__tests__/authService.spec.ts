import { apiAuth } from "@/services/api";
import { LoginPayload } from "../types/signInTypes";
import { useAuthServiceLogin } from "../services/authService";

jest.mock("@/services/api");

const mockedApi = apiAuth as jest.Mocked<typeof apiAuth>;

describe("useAuthServiceLogin", () => {
  const { login } = useAuthServiceLogin();

  const payload: LoginPayload = {
    user: "joao@example.com",
    password: "123456",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar os dados ao fazer login com sucesso", async () => {
    const mockResponse = { token: "abc123", name: "João" };

    mockedApi.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await login(payload);

    expect(mockedApi.post).toHaveBeenCalledWith("/signIn", payload);
    expect(result).toEqual(mockResponse);
  });

  it("deve lançar erro com mensagem da API se houver erro de resposta", async () => {
    mockedApi.post.mockRejectedValueOnce({
      response: { data: { message: "Credenciais inválidas" } },
    });

    await expect(login(payload)).rejects.toThrow("Credenciais inválidas");
  });

  it("deve lançar erro genérico se não houver mensagem da API", async () => {
    mockedApi.post.mockRejectedValueOnce({});

    await expect(login(payload)).rejects.toThrow("Falha no login");
  });
});
