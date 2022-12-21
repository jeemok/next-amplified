// pages/index.js
import {
  Authenticator,
  useTheme,
  useAuthenticator,
  View,
  Image,
  Text,
  Heading,
  Button,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { useRouter } from 'next/router';
import Head from "next/head";
import React from "react";
import awsExports from "../src/aws-exports";
import styles from "../styles/Login.module.css";

Amplify.configure({ ...awsExports, ssr: true });

const components = {
  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.medium}>
          <Heading
            padding={`${tokens.space.medium} 0 0 0`}
            level={3}
          >
            <Image
              alt="Gifted logo"
              src="https://lms.gift-ed.com/static/gifted_theme/images/logo.547da5097750.svg"
              style={{ maxHeight: 70 }}
            />
            <div style={{ marginTop: 10, fontSize: "0.8em" }}>Log In</div>
          </Heading>
        </View>
      );
    },
    Footer() {
      const { toResetPassword } = useAuthenticator();

      return (
        <View textAlign="center" padding="0 0 1rem 0">
          <Button
            fontWeight="normal"
            onClick={toResetPassword}
            size="small"
            variation="link"
          >
            Reset Password
          </Button>
        </View>
      );
    },
  },
  ResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

const formFields = {
  signIn: {
    username: {
      isRequired: true,
      placeholder: "Enter your email",
    },
  },
};

export default function Login() {
  const router = useRouter();
  const { route } = useAuthenticator(context => [context.route]);

  React.useEffect(() => {
    if (route === 'authenticated') {
      router.push('/');
    }
  }, [route]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Amplify + Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Authenticator
          hideSignUp
          formFields={formFields}
          components={components}
        >
          {({ signOut }) => <button onClick={signOut}>Sign out</button>}
        </Authenticator>
      </main>
    </div>
  );
}
