// src/pages/__tests__/LoginPage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../slices/authSlice";
import LoginPage from "../../components/LoginPage";

function renderWithStore(preloadedState?: any) {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );
}

describe("LoginPage", () => {
  it("renders login form", () => {
    renderWithStore({ auth: { status: "idle", error: null, token: null } });

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/login/i);
  });

  it("shows loading state on submit", () => {
    renderWithStore({ auth: { status: "idle", error: null, token: null } });

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
