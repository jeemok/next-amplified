// pages/index.js
import { Amplify, API, withSSRContext } from "aws-amplify";
import Head from "next/head";
import awsExports from "../src/aws-exports";
import { createPost } from "../src/graphql/mutations";
import { listPosts } from "../src/graphql/queries";
import styles from "../styles/Home.module.css";

import CourseList from "../src/containers/Dashboard/CourseList";

Amplify.configure({ ...awsExports, ssr: true });

export async function getServerSideProps({ req }) {
  const SSR = withSSRContext({ req });
  try {
    const response = await SSR.API.graphql({ query: listPosts });
    return {
      props: {
        posts: response.data.listPosts.items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}

async function handleCreatePost(event) {
  event.preventDefault();

  const form = new FormData(event.target);

  try {
    const { data } = await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: createPost,
      variables: {
        input: {
          title: form.get("title"),
          content: form.get("content"),
        },
      },
    });

    window.location.href = `/posts/${data.createPost.id}`;
  } catch ({ errors }) {
    console.error(...errors);
    throw new Error(errors[0].message);
  }
}

export default function Home({ posts = [] }) {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Amplify + Next.js</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://d2qfs6i220e922.cloudfront.net/Video JS/VideoJS/video-js-v1.css"
            rel="stylesheet"
          />
          <link
            href="https://d2qfs6i220e922.cloudfront.net/Video JS/Transcript/videojs-transcript-v1.css"
            rel="stylesheet"
          />
        </Head>

        <main className={styles.main}>
          {/* <h1 className={styles.title}>Amplify + Next.js</h1> */}

          <CourseList />

          {/* https://www.npmjs.com/package/video.js */}
          <video
            id="video1"
            name="c1-trailer"
            className="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"
            controls
            poster="https://d2qfs6i220e922.cloudfront.net/Why+GIFTed/thumbnail/Why-GIFTed.jpg"
            preload="true"
            data-setup='{ "playbackRates": [1, 1.25, 1.5, 1.75, 2] }'
          >
            <source src="https://d2qfs6i220e922.cloudfront.net/Why GIFTed/m3u8/Why GIFTed_V7_1.m3u8"></source>
          </video>

          <p className={styles.description}>
            <code style={{ marginRight: 10 }}>{posts.length}</code>
            posts
          </p>

          <div className={styles.grid}>
            {posts.map((post) => {
              return (
                <a
                  className={styles.card}
                  href={`/posts/${post.id}`}
                  key={post.id}
                >
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </a>
              );
            })}
          </div>

          <form
            onSubmit={handleCreatePost}
            style={{ width: "100%", maxWidth: 600 }}
          >
            <fieldset>
              <legend>Title</legend>
              <input
                defaultValue={`Today, ${new Date().toLocaleTimeString()}`}
                name="title"
                style={{ width: "100%" }}
              />
            </fieldset>

            <fieldset>
              <legend>Content</legend>
              <textarea
                defaultValue="I built an Amplify project with Next.js!"
                name="content"
                style={{ width: "100%" }}
              />
            </fieldset>

            <button style={{ marginTop: 10, width: "100%" }}>
              Create Post
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
