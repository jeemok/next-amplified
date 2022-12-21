import { NextResponse } from "next/server";
// import { Amplify, withSSRContext } from "aws-amplify";
import awsExports from "./src/aws-exports";

// Amplify.configure({ ...awsexports, ssr: true })

export async function middleware(request) {
  // console.log('request: ', JSON.stringify(request.headers, null, 2));
  // // Authentication
  // if (request.nextUrl.pathname.startsWith('/courses')) {
  //   return NextResponse.rewrite("/unassigned");
  // }

  // This logic is only applied to /courses
  if (request.nextUrl.pathname.startsWith("/courses")) {
    // const SSR = withSSRContext({ req });
    // try {
    //   const courseSlug = resolvedUrl.split("/")[2];
    //   // https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#retrieve-current-authenticated-user
    //   const { username: userId } = await SSR.Auth.currentAuthenticatedUser();
    //   console.log("checking user ", userId, " with courseSlug: ", courseSlug);

    //   const response = await SSR.API.graphql({
    //     query: isUserEnrolled,
    //     variables: { userId, courseSlug },
    //   });

    //   if (response.data.listAssignments.items.length === 0) {
    //     console.log("invalid user assignemnt!");
    //     // https://nextjs.org/docs/messages/middleware-relative-urls
    //     const url = request.nextUrl.clone();
    //     url.pathname = "/unassigned";
    //     return NextResponse.rewrite(url);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return NextResponse.next();
}
