const request = require("supertest");
const app = require("../../app");
exports.signin = async () => {
  console.log("Running");
  const response = await request(app)
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
      //console logging cookie
    });
  const cookie = response.get("Set-Cookie");
  console.log("value for cookie");
  console.log(cookie);
  return cookie;
};
