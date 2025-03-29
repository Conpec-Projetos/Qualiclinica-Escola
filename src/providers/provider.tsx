"use client";

import { ReactNode } from "react";
import AuthProvider from "@/contexts/auth.context";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return <AuthProvider>{children}</AuthProvider>;
}
