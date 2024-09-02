import { useTranslations } from "@/i18n/I18nProvider";
import { STORAGE_IDENTITY_KEY, STORAGE_LANGUAGE_KEY } from "@/utils/constants";
import {
  LanguagesList,
  parseContent,
  useConfig,
  useIdentity,
  useNostr,
} from "@lawallet/react";
import { AvailableLanguages } from "@lawallet/react/types";
import { useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
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
  const { validateRelaysStatus, initializeSigner } = useNostr();
  const identity = useIdentity();
  const { lng, changeLanguage } = useTranslations();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [appState, setAppState] = useState(AppState.currentState);

  const config = useConfig();

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        validateRelaysStatus();
      }

      setAppState(nextAppState);
    },
    [appState]
  );

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);

  const route = useRoute();

  const pathname = useMemo(() => {
    return route.name;
  }, [route]);

  const authenticate = async (privateKey: string) => {
    const initialized = await identity.initializeFromPrivateKey(privateKey);
    if (initialized) initializeSigner(identity.signer);
    setIsLoading(false);

    return initialized;
  };

  const loadStorage = async () => {
    try {
      const storageLanguage = (await config.storage.getItem(
        STORAGE_LANGUAGE_KEY
      )) as AvailableLanguages;

      if (
        storageLanguage &&
        storageLanguage !== lng &&
        LanguagesList.includes(storageLanguage)
      )
        changeLanguage(storageLanguage);

      const storageIdentity = await config.storage.getItem(
        STORAGE_IDENTITY_KEY
      );

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
    loadStorage();
  }, []);

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

  return !hydrateApp ? <SpinnerView /> : children;
};

export default AuthProvider;
