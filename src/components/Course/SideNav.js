import { Box, Accordion, Checkbox, UnstyledButton, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

function Item({ chapter, disabled }) {
  return (
    <Box my="xs" ml="xs" key={chapter.title}>
      <Link
        href={`/courses/getting-started-with-gift-ed/chapters/${chapter.slug}`}
      >
        <UnstyledButton>
          <Checkbox
            disabled={disabled}
            readOnly
            checked={chapter.completed}
            label={
              <div>
                <Text size="xs">{chapter.title}</Text>
                <Text size="xs" color="dimmed">
                  {~~(Math.random() * 10) + 1} hours{" "}
                  {~~(Math.random() * 10) + 1} min
                </Text>
              </div>
            }
          />
        </UnstyledButton>
      </Link>
    </Box>
  );
}

export default function SideNav({ modules }) {
  return (
    <Accordion defaultValue={modules.map((m) => m.title)}>
      {modules.map(({ title, chapters }, index) => (
        <Accordion.Item key={title} value={title}>
          <Accordion.Control>
            <Text size="sm">
              {("0" + (index + 1)).slice(-2)}. {title}
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            {React.Children.toArray(
              chapters.map((chapter) => {
                if (!chapter.prerequisite) {
                  return <Item chapter={chapter} />;
                }

                const prerequisiteModule = modules.find(
                  (m) => m.slug === chapter.prerequisite.split("/")[0]
                );

                if (!prerequisiteModule) {
                  return <Item disabled chapter={chapter} />;
                }

                const prerequisiteChapter = prerequisiteModule.chapters.find(
                  (c) => c.slug === chapter.prerequisite.split("/")[1]
                );

                if (!prerequisiteChapter || !prerequisiteChapter.completed) {
                  return <Item disabled chapter={chapter} />;
                }
                
                return <Item chapter={chapter} />;
              })
            )}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
