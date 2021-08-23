import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "../components/Button";
import LoginIcon from "../components/icons/LoginIcon";
import Wrapper from "../components/Wrapper";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { loginWithGoogle, currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && currentUser) router.replace("/");
  }, [isLoading, currentUser, router]);
  return (
    <div className="min-h-screen min-w-screen bg-zajavaBlue-900 flex flex-col lg:flex-row">
      <Head>
        <title>ZajavaDevTools</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Tools for ZajavaCraft developers" />
      </Head>
      <Wrapper>
        <div className="my-auto flex justify-center">
          <Button onClick={loginWithGoogle}>
            Zaloguj się przy użyciu konta Google <LoginIcon />
          </Button>
        </div>
      </Wrapper>
    </div>
  );
}
