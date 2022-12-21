import { withSSRContext } from "aws-amplify";
import { isUserEnrolled } from "../graphql/queries";

// Ideally this should be placed in the middleware
// However, aws-amplify doesn't yet support nextjs 12,13
// and we will need the token or userID in checking the enrollment
// so we will be using this way for now.

export async function getServerSideProps({ req, resolvedUrl }) {
  // Only check for courses, skip for the rest
  if (!resolvedUrl?.startsWith("/courses")) {
    return {
      props: {},
    };
  }

  const SSR = withSSRContext({ req });
  try {
    const courseSlug = resolvedUrl.split("/")[2];

    // https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#retrieve-current-authenticated-user
    const { username: userId } = await SSR.Auth.currentAuthenticatedUser();

    const response = await SSR.API.graphql({
      query: isUserEnrolled,
      variables: { userId, courseSlug },
    });

    if (response.data.listAssignments.items.length === 0) {
      console.info(
        `[${new Date().toISOString()}] ❌ Invalid access for user ID: ${userId} with course: ${courseSlug}`
      );
      return {
        redirect: {
          destination: "/unassigned",
          permanent: false,
        },
      };
    }

    console.info(
      `[${new Date().toISOString()}] ✅ Validated user ID: ${userId} with course: ${courseSlug}`
    );
    return {
      props: {},
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}
