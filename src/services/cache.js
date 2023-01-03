import { Cache } from "aws-amplify";

const LAST_COURSE_KEY = "lastcourse";

const generateUserProgressKey = (userId, courseSlug, moduleSlug, chapterSlug) =>
  ["progress", userId, courseSlug, moduleSlug, chapterSlug].join(".");

export const setUserProgress = (userId, courseSlug, moduleSlug, chapterSlug) =>
  Cache.setItem(
    generateUserProgressKey(userId, courseSlug, moduleSlug, chapterSlug),
    true
  );

export const getUserProgress = (userId, courseSlug, moduleSlug, chapterSlug) =>
  Cache.getItem(
    generateUserProgressKey(userId, courseSlug, moduleSlug, chapterSlug)
  );

export const setUserLastCourse = (link) => Cache.setItem(LAST_COURSE_KEY, link);

export const getUserLastCourse = () => Cache.getItem(LAST_COURSE_KEY);

export const getCacheCurSize = () => Cache.getCacheCurSize();

export const getAllKeys = () => Cache.getAllKeys();
