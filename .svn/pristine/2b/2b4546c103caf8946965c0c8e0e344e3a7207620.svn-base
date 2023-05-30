import jwt_decode from "jwt-decode";
import { tryGetRefreshToken } from "../actions";
import dayjs from "dayjs";

/// save information about tokens in cookies
/// if access Token Exists but it is expired redirect to Login
///

class AuthService {
  getUserToken = () => localStorage.getItem("token");
  getUserRefreshToken = () => localStorage.getItem("refreshToken");
  getUserRefreshTokenExpiry = () => localStorage.getItem("refreshTokenExpiry");
  getIsRefreshing = () => localStorage.getItem("isRefreshing");
  getCustomerId = () => localStorage.getItem("customerId");
  getIsStarter = () => {
    const organization= this.getCustomerOrganizations()?.find(x=>x.customerId==this.getCustomerId())
    return organization?.isStarter;
  };
  getUser = () => JSON.parse(localStorage.getItem("user"));
  getCustomerOrganizations = () => JSON.parse(localStorage.getItem("customerOrganizations"));

  isValidToken = (token) => {
    if (!token) {
      return false;
    }
    const decoded = jwt_decode(token);
    if (decoded) {
      const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 500;
      if (!isExpired) return true;
    }
    return false;
  };

  isAuthenticated = () => {
    if (this.isValidToken(this.getUserToken())) return true;
    return false;
  };

  isRefreshAuthenticated = () => {
    if (this.getUserRefreshTokenExpiry()) {
      const isExpired =
        dayjs.unix(this.getUserRefreshTokenExpiry()).diff(dayjs()) < 1;
      if (!isExpired) return true;
    }
    return false;
  };

  isRefreshing = () => {
    const isLoading = this.getIsRefreshing();
    if (isLoading) return true;
    return false;
  };

  handleAuthentication() {
    const accessToken = this.getUserToken();
    if (!accessToken) {
      this.setSession(null);
    }

    if (this.isValidToken(accessToken)) {
      this.setSession(accessToken);
    } else {
      this.setSession(null);
    }
  }

  setSession = (token) => {
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  setUser = (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  setCustomerId = (customerId) => {
    if (customerId) {
      localStorage.setItem("customerId", customerId);
    }
  };

  setCustomerOrganizations = (organization) => {
    if (organization) {
      localStorage.setItem("customerOrganizations", JSON.stringify(organization));
    }
  };

  setIsStarter = (isStarter) => {
    localStorage.setItem("isStarter", isStarter);

  };

  setUserRefreshToken = (refreshToken, expiry) => {
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("refreshTokenExpiry", expiry);
  };

  logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenExpiry");
    // localStorage.removeItem("customerId");
    localStorage.removeItem("isStarter");

  };
  waitForRefresh = async () => {
    return new Promise((resolve) => {
      while (this.isRefreshing() === true) {
        //alert(this.getIsRefreshing())

        setTimeout(
          console.log("asdhljaskldashdks", this.getIsRefreshing()),
          2000
        );
      }
      resolve(this.getIsRefreshing());
    });
  };

  tryRefresh = async (axiosRefreshInstance) => {
    if (this.isRefreshAuthenticated()) {

      const resp = await tryGetRefreshToken(axiosRefreshInstance,{refreshToken: this.getUserRefreshToken()})
      if (resp.status===200 || resp.status===201) {
        this.setSession(resp.data.accessToken)
        this.setUserRefreshToken(resp.data.refreshToken, resp.data.refreshTokenExpire)
        //this.setUser(resp.user)
        //this.setCustomerId(resp.customerAppusers[0].customerId)
        return resp.data;
      }
    }
    this.logout();
    window.location.reload(); 
  };
}

const authService = new AuthService();
export default authService;
