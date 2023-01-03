import React from "react";
import { useRouter } from "next/router";
import { getServerSideProps } from "../helpers/enrollment-auth";
import CourseUtils from "../utils/course";
import PrerequisiteBlock from "../components/Course/PrerequisiteBlock";

export { getServerSideProps };

export default function CourseProviderHOC({ children }) {
  const router = useRouter();

  const { errorMessage, course, chapter, ...rest } = CourseUtils.findCourse(
    router.query["course-slug"],
    router.query["module-slug"],
    router.query["chapter-slug"]
  );

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  // Stop here if it is only the course page
  if (!chapter) {
    return React.cloneElement(children, { course });
  }

  // Client side checking on cached progress
  // TODO: should move this to backend and validate on server side
  if (chapter.prerequisite) {
    const isCompleted = CourseUtils.validatePrerequisite(
      course.slug,
      chapter.prerequisite,
      "53a4300f-8a95-4334-b989-8466390e28c1"
    );
    if (!isCompleted) {
      return (
        <PrerequisiteBlock
          prerequisiteLink={`/courses/${course.slug}/${chapter.prerequisite}`}
        />
      );
    }
  }

  return React.cloneElement(children, {
    course,
    chapter,
    ...rest,
  });
}
