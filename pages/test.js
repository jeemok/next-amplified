import React from "react";
import { Amplify, API, withSSRContext } from "aws-amplify";
import awsExports from "../src/aws-exports";

// Amplify.configure({ ...awsExports, ssr: true });

export async function getServerSideProps({ req }) {
  const SSR = withSSRContext({ req });
  try {
    const response = await SSR.API.get("testapi", "/posts");
    console.log("response: ", response);
    return {
      props: {
        ssrResults: response,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}

export default ({ ssrResults }) => {
  console.log("ssrResults: ", ssrResults);
  const handleClick = () => {
    API.get("testapi", "/enrollments/enrollmentCheck", { query: { userId: 'test' }})
      .then((result) => {
        console.log("result: ", result);
        console.log("JSON.parse(result.body)", JSON.parse(result.body));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>Click to test</button>
    </div>
  );
};
