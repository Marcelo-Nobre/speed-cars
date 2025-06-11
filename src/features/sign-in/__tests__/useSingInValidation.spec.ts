import { renderHook, act } from "@testing-library/react";
import { useSignInValidation } from "@/features/sign-in/hooks/useSignInValidation";

describe("useSignInValidation", () => {
  it("deve iniciar com valores default", () => {
    const { result } = renderHook(() => useSignInValidation());

    expect(result.current.getValues()).toEqual({
      user: "",
      password: "",
    });
  });

  it("deve atualizar valores com setValue", () => {
    const { result } = renderHook(() => useSignInValidation());

    act(() => {
      result.current.setValue("user", "joao@example.com");
      result.current.setValue("password", "123456");
    });

    expect(result.current.getValues()).toEqual({
      user: "joao@example.com",
      password: "123456",
    });
  });

  it("deve resetar os valores", () => {
    const { result } = renderHook(() => useSignInValidation());

    act(() => {
      result.current.setValue("user", "test@test.com");
      result.current.reset();
    });

    expect(result.current.getValues()).toEqual({
      user: "",
      password: "",
    });
  });
});
