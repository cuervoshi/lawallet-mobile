import DashboardView from "@/screens/Dashboard";
import LoginView from "@/screens/Login";
import { useIdentity } from "@lawallet/react";
import React from "react";

const index = () => {
  const identity = useIdentity();

  if (Boolean(identity.pubkey.length)) {
    return <DashboardView />;
  } else {
    return <LoginView />;
  }
};

export default index;
