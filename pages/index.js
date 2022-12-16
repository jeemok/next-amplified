// pages/index.js
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../src/components/Header";
import CourseList from "../src/containers/Dashboard/CourseList";

export default function Home() {
  return (
    <>
      <Header />

      <div className={styles.container}>
        <Head>
          <title>Amplify + Next.js</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {/* <h1 className={styles.title}>Amplify + Next.js</h1> */}

          <CourseList />
        </main>
      </div>
    </>
  );
}
