import Head from "next/head";
import { useRouter } from "next/router";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import Login from "./login";
import Unauthorised from "./unauthorised";
import Header from "./../src/components/Navigation/Header";
import Footer from "./../src/components/Navigation/Footer";
import { AppContextProvider, useAppContext } from "../src/contexts/global";

import "../styles/globals.css";
import "@aws-amplify/ui-react/styles.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { appTheme } = useAppContext();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const isAuthenticated = authStatus === "authenticated";

  if (router.pathname === "/login") {
    return <Login />;
  }

  // Should probably move into route middleware once it is supported:
  // https://github.com/aws-amplify/amplify-js/issues/9145
  if (!isAuthenticated) {
    return <Unauthorised />;
  }

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: appTheme.colorScheme,
        // https://mantine.dev/theming/colors/
        primaryColor: "red",
      }}
    >
      <NotificationsProvider>
        <Header />
        {/* Content */}
        <Component {...pageProps} />
        {/* Footer */}
        <Footer />
      </NotificationsProvider>
    </MantineProvider>
  );
}

function AuthenticationWrapper(props) {
  return (
    <>
      <Head>
        <title>GIFT.ed</title>
      </Head>
      <Authenticator.Provider>
        <AppContextProvider>
          <MyApp {...props} />
        </AppContextProvider>
      </Authenticator.Provider>
    </>
  );
}

export default AuthenticationWrapper;
