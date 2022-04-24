import {
  createContext,
  ElementType,
  useCallback,
  useEffect,
  useState,
} from "react";
import * as fcl from "@onflow/fcl";

interface AuthContextInterface {
  user?: any;
  points: number | null;
  login: () => void;
  logout: () => void;
  accessToken?: string | null;
}

const AuthContext = createContext<AuthContextInterface>({
  points: null,
  login: () => {},
  logout: () => {},
});

const isMainnet = process.env.REACT_APP_NETWORK === "mainnet";
const BACKEND_URL = isMainnet
  ? "https://flow-wallet.blocto.app/blocto"
  : "https://flow-wallet-testnet.blocto.app/blocto";

export const withAuthContext = (Component: ElementType) => (props: any) => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(null);
  const [accessToken, setAccessToken] = useState<string | null | undefined>(
    null
  );

  const login = useCallback(() => fcl.authenticate(), []);
  const logout = useCallback(() => fcl.unauthenticate(), []);

  useEffect(() => {
    fcl.currentUser().subscribe((currentUser: any) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    const listener = (e: any) => {
      if (e.data.type === "FCL::BLOCTO::INTERNAL") {
        localStorage.setItem("ACCESS_TOKEN", e.data.accessToken);
        setAccessToken(e.data.accessToken);
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  useEffect(() => {
    setAccessToken(localStorage.getItem("ACCESS_TOKEN"));
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetch(`${BACKEND_URL}/account/getUserInfo`, {
        headers: {
          Accept: "application/json",
          authorization: accessToken,
        },
      })
        .then((response) => response.json())
        .then((data) => setPoints(data.point));
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ login, logout, user, points, accessToken }}>
      <Component {...props} />
    </AuthContext.Provider>
  );
};
export default AuthContext;
