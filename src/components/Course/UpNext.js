import React from "react";
import { IconBook2 } from "@tabler/icons";
import { Button, Text, Stack } from "@mantine/core";
import Link from "../../components/Common/LinkWrapper";
import { setUserProgress } from "../../services/cache";
import CourseUtils from "../../utils/course";

export const UpNext = ({
  course,
  module,
  chapter,
  nextModule,
  nextChapter,
}) => {
  return (
    <Stack align="center" spacing="xs">
      <Text size="xs" color="dimmed">
        Up next
      </Text>
      <IconBook2 size={40} />
      <Text size="xl" fw="bold">
        {nextChapter ? nextChapter.title : "Congratulations!"}
      </Text>
      <Text size="xs">{nextModule?.title}</Text>
      <Text size="xs" mt={-10}>
        {nextChapter ? nextChapter.duration : "You've completed the course! "}
      </Text>
      {nextChapter && (
        <Link
          href={CourseUtils.constructChapterUrl(
            course,
            nextModule,
            nextChapter
          )}
        >
          <Button
            mt="xs"
            radius="xl"
            px="xl"
            onClick={() => {
              setUserProgress(
                // TODO: fix this userId to dynamic, and figure out why cache isnt working
                "53a4300f-8a95-4334-b989-8466390e28c1",
                course.slug,
                module.slug,
                chapter.slug
              );
            }}
          >
            Start
          </Button>
        </Link>
      )}
    </Stack>
  );
};

export default UpNext;
