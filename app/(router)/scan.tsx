import { useEffect, useState } from "react";
import ScanView from "../screens/Scan";
import { usePathname } from "expo-router";
import { SpinnerView } from "@/components/SpinnerView/SpinnerView";

const scan = () => {
  const [isFocus, setIsFocus] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let scanViewIsFocused =
      pathname === "/scan" || pathname === "/(router)/scan";

    setIsFocus(scanViewIsFocused);
  }, [pathname]);

  return isFocus ? <ScanView /> : <SpinnerView />;
};

export default scan;
