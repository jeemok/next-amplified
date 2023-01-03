// pages/index.js
import styles from "../styles/Home.module.css";
import CourseList from "../src/containers/Dashboard/CourseList";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <CourseList />
      </main>
    </div>
  );
}
