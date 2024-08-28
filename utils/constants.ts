import { appTheme } from "@/utils/theme";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const STORAGE_IDENTITY_KEY = "identity";
export const CACHE_TXS_KEY = "cached_txs";
export const CACHE_BACKUP_KEY = "backup";

export const APP_NAME = "LaWallet";
export const MAX_INVOICE_AMOUNT = 10 ** 7;

export const regexUserName: RegExp = /^[A-Za-z0123456789]+$/;
export const regexComment: RegExp = /^[.,()[\]_\-a-zA-Z0-9'"¡!¿?:;\s]+$/;
export const regexURL = /^(http|https):\/\/[^ "]+$/;

export const lightningAddresses = [
  "lawallet.ar",
  "hodl.ar",
  "walletofsatoshi.com",
  "getalby.com",
  "blink.sv",
  "bitrefill.com",
  "btcpp.ar",
  "pay.bbw.sv",
  "bitnob.com",
  "lifpay.me",
  "ln.tips",
  "sudonym.app",
  "zbd.gg",
];

// export const EMERGENCY_LOCK_SERVER = false;
// export const EMERGENCY_LOCK_SERVER_DISCLAIMER = 'Test text';
export const EMERGENCY_LOCK_DEPOSIT = false;
export const EMERGENCY_LOCK_TRANSFER = false;

export const globalStyles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
    minWidth: "100%",
    minHeight: "100%",
    fontWeight: 400,
    fontFamily: appTheme.font.secondary,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
    width: "100%",
    height: "100%",
  },
});
