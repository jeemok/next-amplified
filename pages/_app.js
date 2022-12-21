import Script from "next/script";
import { Authenticator } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { MantineProvider } from "@mantine/core";
import { useRouter } from "next/router";
import "../styles/globals.css";
import "@aws-amplify/ui-react/styles.css";
import Login from "./login";
import Unauthorised from "./unauthorised";
import Header from "./../src/components/Navigation/Header";
import Footer from "./../src/components/Navigation/Footer";
import { AppContextProvider, useAppContext } from "../src/contexts/global";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { appTheme } = useAppContext();

  if (router.pathname === "/login") {
    return <Login />;
  }

  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const isAuthenticated = authStatus === "authenticated";

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
      <Header />
      {/* Videojs script */}
      <Script src="//vjs.zencdn.net/7.10.2/video.min.js" />
      {/* Content */}
      <Component {...pageProps} />
      {/* Footer */}
      <Footer />
    </MantineProvider>
  );
}

function AuthenticationWrapper(props) {
  return (
    <Authenticator.Provider>
      <AppContextProvider>
        <MyApp {...props} />
      </AppContextProvider>
    </Authenticator.Provider>
  );
}

export default AuthenticationWrapper;
