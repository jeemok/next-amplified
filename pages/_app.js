import { Authenticator } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "../styles/globals.css";
import "@aws-amplify/ui-react/styles.css";
import Login from "./login";

function MyApp({ Component, pageProps }) {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const isAuthenticated = authStatus === "authenticated";
  const MyComponent = isAuthenticated ? Component : Login;
  return <MyComponent {...pageProps} />;
}

function AuthenticationWrapper(props) {
  return (
    <Authenticator.Provider>
      <MyApp {...props} />
    </Authenticator.Provider>
  );
}

export default AuthenticationWrapper;
