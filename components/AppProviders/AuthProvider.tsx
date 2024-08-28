import { STORAGE_IDENTITY_KEY } from "@/utils/constants";
import { parseContent, useIdentity, useNostr } from "@lawallet/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { Href, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { SpinnerView } from "../SpinnerView/SpinnerView";

interface RouterInfo {
  disconnectedPaths: string[]; // Routes that require you to NOT have a connected account
  connectedPaths: string[]; // Routes that require you to HAVE a connected account
}

const AppRouter: RouterInfo = {
  disconnectedPaths: [
    "/(router)/",
    "/(router)/start",
    "/(router)/signup",
    "/(router)/login",
    "/(router)/reset",
  ],
  connectedPaths: [
    "/(router)/dashboard",
    "/(router)/deposit",
    "/(router)/extensions",
    "/(router)/scan",
    "/(router)/settings",
    "/(router)/transactions",
    "/(router)/transfer",
  ],
};

export type StoragedIdentityInfo = {
  username: string;
  pubkey: string;
  privateKey: string;
};

const isProtectedRoute = (path: string, paths: string[]): boolean => {
  return paths.includes(path.toLowerCase());
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const identity = useIdentity();
  const { initializeSigner } = useNostr();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const route = useRoute();

  const pathname = useMemo(() => {
    return route.name;
  }, [route]);
  const params = route.params || {};

  const authenticate = async (privateKey: string) => {
    const initialized = await identity.initializeFromPrivateKey(privateKey);
    if (initialized) initializeSigner(identity.signer);
    setIsLoading(false);

    return initialized;
  };

  const loadIdentityFromStorage = async () => {
    try {
      const storageIdentity = await AsyncStorage.getItem(STORAGE_IDENTITY_KEY);

      if (storageIdentity) {
        const parsedIdentity: StoragedIdentityInfo[] =
          parseContent(storageIdentity);

        const auth = await authenticate(parsedIdentity[0]?.privateKey);
        return auth;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    loadIdentityFromStorage();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const pathSegment = `/${String(pathname.split("/")[0] ?? "")}/`;
      const requireAuth = isProtectedRoute(
        pathSegment,
        AppRouter.connectedPaths
      );
      const requireDisconnectedUser = isProtectedRoute(
        pathSegment,
        AppRouter.disconnectedPaths
      );

      const userConnected = Boolean(identity.pubkey.length);

      switch (true) {
        case !userConnected && requireAuth:
          router.replace("/(router)/" as Href);
          break;

        case userConnected && requireDisconnectedUser:
          router.replace("/(router)/dashboard" as Href);
          break;
      }
    }
  }, [pathname, identity, isLoading]);

  const hydrateApp = useMemo(() => {
    if (isLoading) return false;

    const pathSegment = `/${String(pathname.split("/")[0] ?? "")}`;
    const requireAuth = isProtectedRoute(pathSegment, AppRouter.connectedPaths);
    const requireDisconnectedUser = isProtectedRoute(
      pathSegment,
      AppRouter.disconnectedPaths
    );

    const userConnected = Boolean(identity.pubkey.length);

    if (userConnected && requireAuth) return true;
    if (!userConnected && requireDisconnectedUser) return true;

    return Boolean(!requireAuth && !requireDisconnectedUser);
  }, [isLoading, pathname, identity]);

  return !hydrateApp ? <SpinnerView /> : <>{children}</>;
};

export default AuthProvider;
