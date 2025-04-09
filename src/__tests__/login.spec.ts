import { test, expect } from "@playwright/test";

const baseURL = "http://localhost:3000";

const mockUser = {
  email: "eve.holt@reqres.in",
  password: "cityslicka"
};

test.describe("Flujo de sesion", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseURL}/login`);
  });

  test("renderiza correctamente el formulario de login", async ({ page }) => {
    await expect(page.getByPlaceholder("Correo electrónico")).toBeVisible();
    await expect(page.getByPlaceholder("Contraseña")).toBeVisible();
    await expect(page.getByRole("button", { name: "Iniciar sesión" })).toBeDisabled();
  });

  test("activa el botón de login con campos válidos", async ({ page }) => {
    await page.getByPlaceholder("Correo electrónico").fill(mockUser.email);
    await page.getByPlaceholder("Contraseña").fill(mockUser.password);
    await expect(page.getByRole("button", { name: "Iniciar sesión" })).toBeEnabled();
  });

  test("muestra error con credenciales inválidas", async ({ page }) => {
    await page.getByPlaceholder("Correo electrónico").fill("wrong@email.com");
    await page.getByPlaceholder("Contraseña").fill("wrongpassword");
    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    await expect(page.locator("text=El usuario no existe")).toBeVisible();
  });

  test("redirige al dashboard si el login es exitoso", async ({ page }) => {
    await page.getByPlaceholder("Correo electrónico").fill(mockUser.email);
    await page.getByPlaceholder("Contraseña").fill(mockUser.password);
    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    await page.waitForURL(`${baseURL}/dashboard`);
    await expect(page).toHaveURL(`${baseURL}/dashboard`);
    await expect(page.locator("text=Bienvenido a tu tablero")).toBeVisible();
  });
});
