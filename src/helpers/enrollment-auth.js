import { withSSRContext } from "aws-amplify";
import { listAssignments } from "../graphql/queries";

// Ideally this should be placed in the middleware
// However, aws-amplify doesn't yet support nextjs 12,13
// and we will need the token or userID in checking the enrollment
// so we will be using this way for now.

// NOTE: calling it (via REST API - API Gateway) multiple times call 502 error sometimes. Changing it back to GraphQL for now.
// const REST_API = "testapi";

// async function checkForEnrollment(req, resolvedUrl) {
//   const courseSlug = resolvedUrl.split("/")[2];
//   const SSR = withSSRContext({ req });

//   // https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#retrieve-current-authenticated-user
//   const { username: userId } = await SSR.Auth.currentAuthenticatedUser();

//   try {
//     const response = await SSR.API.get(
//       REST_API,
//       "/enrollments/enrollmentCheck",
//       { queryStringParameters: { userId, courseSlug } }
//     );

//     console.info(
//       [
//         `[${new Date().toISOString()}]`,
//         `✅ Validated user ID: ${userId} with course: ${courseSlug}.`,
//         `From Cache: ${response.fromCache}`,
//       ].join(" ")
//     );
//   } catch (err) {
//     if (err?.toJSON()?.status === 404) {
//       console.info(
//         `[${new Date().toISOString()}] ❌ Invalid access for user ID: ${userId} with course: ${courseSlug}`
//       );
//     }
//     else {
//       // TODO: should redirect this else where, but shouldn't allow access to course.
//       console.error("Error validating user enrollment: ", err?.toJSON());
//     }
//     return { redirect: { destination: "/unassigned", permanent: false } };
//   }

//   return {};
// }

async function checkForEnrollment(req, resolvedUrl) {
  const courseSlug = resolvedUrl.split("/")[2];
  const SSR = withSSRContext({ req });

  // https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#retrieve-current-authenticated-user
  const { username: userId } = await SSR.Auth.currentAuthenticatedUser();

  const response = await SSR.API.graphql({
    query: listAssignments,
    variables: {
      filter: {
        and: {
          user_id: { eq: userId },
          course_slug: { eq: courseSlug },
        }
      },
    },
  });

  if (!response?.data?.listAssignments?.items || response.data.listAssignments.items.length === 0) {
    console.info(
      `[${new Date().toISOString()}] ❌ Invalid access for user ID: ${userId} with course: ${courseSlug}`
    );
    return {
      redirect: { destination: "/unassigned", permanent: false },
    };
  }

  // TODO: this should be explicit-allow, not default-allow. To prevent any unauthorised view.
  console.info(
    `[${new Date().toISOString()}] ✅ Validated user ID: ${userId} with course: ${courseSlug}`
  );
  return {};
}

export async function getServerSideProps({ req, resolvedUrl }) {
  // Only check for courses, skip for the rest
  if (!resolvedUrl?.startsWith("/courses")) {
    return { props: {} };
  }

  try {
    const { redirect } = await checkForEnrollment(req, resolvedUrl);

    if (redirect) {
      return { redirect };
    }

    return { props: {} };
  } catch (err) {
    console.error("Error checking for course enrollment", err);
    return {
      props: {},
    };
  }
}
