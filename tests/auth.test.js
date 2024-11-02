const request = require("supertest");
const app = require("../app");

test("http-request", async () => {
  await request(app)
    .get("/api/users/currentusers")
    .expect(200)
    .then((response) => {
      console.log(response.body);
    });
});

test("http-login-post", async () => {
  await request(app)
    .post("/api/users/currentuser")
    .send({
      username: "sadisha",
      password: "admin123!",
      name: "kamal",
      address: "Rathgama No45",
      mobile: "0714309392",
    })
    .expect(200)
    .then((response) => {
      //console.log(response.body);
      const cookie = response.get("Set-Cookie");
      //console logging
      console.log(cookie);
    });
});
