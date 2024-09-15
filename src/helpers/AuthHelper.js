import Cookies from "js-cookie";
import BasicProvider from "../../src/constants/BasicProvider.js";
import { jwtDecode } from "jwt-decode"; // For named export

class AuthHelpers {
  static async login(formdata, navigate, dispatch) {
    try {
      const response = await new BasicProvider(
        "auth/admin/login",
        dispatch
      ).postRequest(formdata);

      console.log("process.env.REACT_APP_DOMAIN", process.env.REACT_APP_DOMAIN);

      Cookies.set(
        `${process.env.REACT_APP_COOKIE_PREFIX}_auth`,
        response?.data?.access_token,
        {
          expires: 3,
          path: "/",
          sameSite: "strict",
          domain: process.env.REACT_APP_DOMAIN || "localhost",
        }
      );

      dispatch({ type: "set", isLogin: true });

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  static async logout() {
    try {
      Cookies.remove(`${process.env.REACT_APP_COOKIE_PREFIX}_auth`, {
        path: "/",
        sameSite: "strict",
      });
    } catch (error) {
      console.error(error);
    }
  }

  static getTokenData() {
    // Get the token from cookies
    const token = Cookies.get(`${process.env.REACT_APP_COOKIE_PREFIX}_auth`);

    if (token) {
      try {
        // Decode the token
        const decodedToken = jwtDecode(token);
        return decodedToken;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }

    return null;
  }
}

export default AuthHelpers;
