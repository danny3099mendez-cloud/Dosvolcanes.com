import request from "supertest";
import app from "../app.js";

describe("Tests del endpoint /contact", () => {
  it("Debería rechazar cuando no hay email", async () => {
    const res = await request(app)
      .post("/api/contact")   // ajusta si tu ruta es distinta
      .send({
        name: "Danny",
        message: "Hola mundo"
      });

    expect(res.status).toBe(400);
  });

  it("Debería aceptar cuando los datos son válidos", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({
        name: "Danny",
        email: "danny@test.com",
        message: "Hola"
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBeDefined();
  });
});