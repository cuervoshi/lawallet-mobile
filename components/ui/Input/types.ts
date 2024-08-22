import { ReactNode } from "react";

export interface FeedbackProps {
  children: ReactNode;
  status?: null | "success" | "error";
  show?: boolean;
}
