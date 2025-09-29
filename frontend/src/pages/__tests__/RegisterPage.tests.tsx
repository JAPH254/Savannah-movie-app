// src/pages/__tests__/RegisterPage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import RegisterPage from "../../components/RegisterPage";
import { registerUser } from "../../slices/authSlice";
import { vi } from "vitest";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("RegisterPage", () => {
  it("shows password mismatch error", () => {
    const store = mockStore({ auth: { error: null } });

    render(
      <Provider store={store}>
        <RegisterPage />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it("shows API validation errors (email + username)", async () => {
    const store = mockStore({
      auth: {
        error: {
          email: "Email already exists",
          username: "Username already taken",
        },
      },
    });

    render(
      <Provider store={store}>
        <RegisterPage />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "tester" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    expect(await screen.findByText(/Email already exists/i)).toBeInTheDocument();
    expect(await screen.findByText(/Username already taken/i)).toBeInTheDocument();
  });
});
