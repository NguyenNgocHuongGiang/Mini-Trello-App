import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";

export const checkLogin = (): boolean => {
  return !!localStorage.getItem("authInfo");
};

export const getAuthData = (key : string) => {
  const info = localStorage.getItem(key);
  console.log(info);
  
  let parsedInfo: { accessToken?: string } | null = null;

  if (info) {
    try {
      parsedInfo = JSON.parse(info);
    } catch {
      return null;
    }
  }

  if (parsedInfo?.accessToken) {
    const decodedToken = jwtDecode<JwtPayload & { data?: any }>(parsedInfo.accessToken);
    console.log(decodedToken);
    
    if (decodedToken) {
      return decodedToken;
    }
    return null;
  }
  return null;
};
