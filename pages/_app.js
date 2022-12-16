import Script from "next/script";
import { Authenticator } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "../styles/globals.css";
import "@aws-amplify/ui-react/styles.css";
import Login from "./login";
import Footer from "./../src/components/Footer";

function MyApp({ Component, pageProps }) {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const isAuthenticated = authStatus === "authenticated";
  const MyComponent = isAuthenticated ? Component : Login;
  return (
    <>
      {/* Videojs script */}
      <Script src="//vjs.zencdn.net/7.10.2/video.min.js" />
      <MyComponent {...pageProps} />
      <Footer />
    </>
  );
}

function AuthenticationWrapper(props) {
  return (
    <Authenticator.Provider>
      <MyApp {...props} />
    </Authenticator.Provider>
  );
}

export default AuthenticationWrapper;
