import courses from "../../data";
import { getUserProgress } from '../services/cache';

export const COURSE_URL_PREFIX = "/courses";

module.exports = {
  constructChapterUrlBySlug: (courseSlug, moduleSlug, chapterSlug) => {
    return [COURSE_URL_PREFIX, courseSlug, moduleSlug, chapterSlug].join(
      "/"
    );
  },
  constructChapterUrl: (course, module, chapter) => {
    return [COURSE_URL_PREFIX, course?.slug, module?.slug, chapter?.slug].join(
      "/"
    );
  },
  findCourse: (courseSlug, moduleSlug, chapterSlug) => {
    const currentCourse = courses.find((c) => c.slug === courseSlug);
    if (!currentCourse) {
      return { errorMessage: "Error: Course not found!" };
    }

    // Stop here if it is only the course page
    if (!moduleSlug) {
      return { course: currentCourse };
    }

    const currentModule = currentCourse?.modules.find(
      (m) => m.slug === moduleSlug
    );
    if (!currentModule) {
      return { errorMessage: "Error: Module not found!" };
    }

    const currentChapter = currentModule?.chapters.find(
      (chap) => chap.slug === chapterSlug
    );
    if (!currentChapter) {
      return { errorMessage: "Error: Chapter not found!" };
    }

    // Try to set the next chapter
    let nextModule = currentModule;
    let nextChapter =
      currentModule?.chapters[
        currentModule.chapters.indexOf(currentChapter) + 1
      ];
    // If this is the last chapter
    if (!nextChapter) {
      // Try to set to the new chapter of next module
      nextModule =
        currentCourse.modules[currentCourse.modules.indexOf(currentModule) + 1];
      nextChapter = nextModule?.chapters[0];
    }

    return {
      course: currentCourse,
      module: currentModule,
      chapter: currentChapter,
      nextModule,
      nextChapter,
    };
  },
  validatePrerequisite: (courseSlug, prerequisite, userId) => {
    const [prerequisiteModule, prerequisiteChapter] = prerequisite.split('/');
    return getUserProgress(userId, courseSlug, prerequisiteModule, prerequisiteChapter);
  }
};
