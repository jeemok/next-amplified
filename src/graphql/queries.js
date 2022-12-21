/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const isUserEnrolled = /* GraphQL */ `
  query isUserEnrolled($userId: ID, $courseSlug: String) {
    listAssignments(
      filter: {
        user_id: { eq: $userId },
        course_slug: { eq: $courseSlug }
      }
    ) {
      items {
        id
      }
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
