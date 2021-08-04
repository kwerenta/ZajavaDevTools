import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import { CharacterProvider } from "../contexts/CharacterContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CharacterProvider>
        <Component {...pageProps} />
      </CharacterProvider>
    </AuthProvider>
  );
}
export default MyApp;
