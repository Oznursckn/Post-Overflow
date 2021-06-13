import axios from "axios";
import Cookies from "universal-cookie";

class AuthService {
  cookies = new Cookies();

  async login(email, password) {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });

    this.cookies.set("authenticatedUser", btoa(JSON.stringify(response.data)));
  }

  async logout() {
    await axios.post("/api/auth/logout");

    this.cookies.remove("authenticatedUser");
  }

  deleteUser() {
    this.cookies.remove("authenticatedUser");
  }

  getAuthenticatedUser() {
    const authUserCookie = this.cookies.get("authenticatedUser");

    if (authUserCookie) {
      //btoa base64 çevirir, atob stringe çevirir
      return JSON.parse(atob(authUserCookie));
    }

    return null;
  }
}

export default new AuthService();
