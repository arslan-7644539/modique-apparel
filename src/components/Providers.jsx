// components/Providers.jsx
"use client";

import { SnackbarProvider } from "notistack";

export default function Providers({ children }) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      maxSnack={3}
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  );
}
