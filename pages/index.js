// pages/index.js
import Head from "next/head";
import styles from "../styles/Home.module.css";
import CourseList from "../src/containers/Dashboard/CourseList";

export default function Home() {
  return (
    <>

      <div className={styles.container}>
        <Head>
          <title>Amplify + Next.js</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <CourseList />
        </main>
      </div>
    </>
  );
}
