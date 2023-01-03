import React from "react";
import Link from "next/link";
import { Box, Accordion, Checkbox, UnstyledButton, Text } from "@mantine/core";
import { IconLock, IconAsterisk } from "@tabler/icons";
import CourseUtils from "../../utils/course";

function Item({ course, module, chapter, disabled, isCurrentChapter }) {
  const Component = disabled ? "span" : Link;
  return (
    <Box my="xs" ml="xs" key={chapter.title}>
      <Component
        href={
          !disabled
            ? CourseUtils.constructChapterUrl(course, module, chapter)
            : "false"
        }
      >
        <UnstyledButton>
          <Checkbox
            icon={disabled ? IconLock : undefined}
            checked={!disabled}
            disabled={disabled}
            readOnly
            label={
              <Box sx={{ cursor: disabled ? "not-allowed" : "pointer" }}>
                <Text size="xs" fw={isCurrentChapter ? "bold" : "initial"}>
                  {chapter.title}
                  {' '}
                  {isCurrentChapter && <IconAsterisk size={10} color="yellow" />}
                </Text>
                <Text size="xs" color="dimmed">
                  {/* TODO: Change to real timing */}
                  {~~(Math.random() * 10) + 1} hours{" "}
                  {~~(Math.random() * 10) + 1} min
                </Text>
              </Box>
            }
          />
        </UnstyledButton>
      </Component>
    </Box>
  );
}

export default function SideNav({
  course,
  module: currentModule,
  chapter: currentChapter,
}) {
  return (
    <Accordion
      multiple
      defaultValue={
        course.modules.find((m) => m.chapters.some((c) => c === currentChapter))
          .title
      }
    >
      {React.Children.toArray(
        course.modules.map((module, index) => (
          <Accordion.Item value={module.title}>
            <Accordion.Control>
              <Text size="sm">
                {("0" + (index + 1)).slice(-2)}. {module.title}
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              {React.Children.toArray(
                module.chapters.map((chapter) => {
                  const isCurrentChapter =
                    module.slug === currentModule.slug &&
                    chapter.slug === currentChapter.slug;

                  if (!chapter.prerequisite) {
                    return (
                      <Item
                        course={course}
                        module={module}
                        chapter={chapter}
                        isCurrentChapter={isCurrentChapter}
                      />
                    );
                  }

                  const prerequisiteModule = course.modules.find(
                    (m) => m.slug === chapter.prerequisite.split("/")[0]
                  );

                  const prerequisiteChapter =
                    prerequisiteModule?.chapters?.find(
                      (c) => c.slug === chapter.prerequisite.split("/")[1]
                    );
                  // TODO: user ID make dynamic
                  const isCompleted = CourseUtils.validatePrerequisite(
                    course.slug,
                    chapter.prerequisite,
                    "53a4300f-8a95-4334-b989-8466390e28c1"
                  );
                  const isDisabled =
                    !prerequisiteModule || !prerequisiteChapter || !isCompleted;
                  return (
                    <Item
                      course={course}
                      module={module}
                      chapter={chapter}
                      disabled={isDisabled}
                      isCurrentChapter={isCurrentChapter}
                    />
                  );
                })
              )}
            </Accordion.Panel>
          </Accordion.Item>
        ))
      )}
    </Accordion>
  );
}
