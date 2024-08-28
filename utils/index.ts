import { BaseStorage, parseContent } from "@lawallet/react";
import { CACHE_BACKUP_KEY, STORAGE_IDENTITY_KEY } from "./constants";
import { StoragedIdentityInfo } from "@/components/AppProviders/AuthProvider";

export const saveIdentityToStorage = async (
  storage: BaseStorage,
  identity: StoragedIdentityInfo,
  makeBackup: boolean = false
) => {
  const storagedIdentity = await storage.getItem(STORAGE_IDENTITY_KEY);

  if (storagedIdentity) {
    const identityList: StoragedIdentityInfo[] = parseContent(storagedIdentity);
    identityList.push(identity);

    await storage.setItem(STORAGE_IDENTITY_KEY, JSON.stringify(identityList));
    if (makeBackup)
      await storage.setItem(`${CACHE_BACKUP_KEY}_${identity.pubkey}`, "1");
  } else {
    const identityToSave: StoragedIdentityInfo[] = [identity];
    await storage.setItem(STORAGE_IDENTITY_KEY, JSON.stringify(identityToSave));
    if (makeBackup)
      await storage.setItem(`${CACHE_BACKUP_KEY}_${identity.pubkey}`, "1");
  }
};

export const extractFirstTwoChars = (str: string): string => {
  try {
    return str.substring(0, 2).toUpperCase();
  } catch {
    return "--";
  }
};

export const getUserStoragedKey = async (
  storage: BaseStorage,
  index: number = 0
) => {
  const storagedKey = await storage.getItem(STORAGE_IDENTITY_KEY);
  if (!storagedKey) return "";

  const Identity: StoragedIdentityInfo[] = parseContent(storagedKey);
  return Identity[index]?.privateKey ?? "";
};
