import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import { CharacterProvider } from "../contexts/CharacterContext";
import { QuestProvider } from "../contexts/QuestContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CharacterProvider>
        <QuestProvider>
          <Component {...pageProps} />
        </QuestProvider>
      </CharacterProvider>
    </AuthProvider>
  );
}
export default MyApp;
