import React from "react";
import {
  Box,
  Accordion,
  UnstyledButton,
  Group,
  Grid,
  Text,
} from "@mantine/core";
import { IconVideo } from "@tabler/icons";
import Link from "next/link";

export default function Outline({ course }) {
  return (
    <Accordion multiple>
      {course.modules?.map(({ title, slug, description, chapters }, index) => (
        <Accordion.Item key={title} value={title}>
          <Accordion.Control>
            <Grid>
              <Grid.Col span={1}>
                <Text size={40} color="dimmed">
                  {("0" + (index + 1)).slice(-2)}
                </Text>
              </Grid.Col>
              <Grid.Col span={10}>
                <Text size={20}>{title}</Text>
                <Text size="sm" color="dimmed">
                  {description}
                </Text>
              </Grid.Col>
            </Grid>
          </Accordion.Control>
          <Accordion.Panel>
            {chapters.map((chapter) => (
              <Box my="xs" ml="sm" key={chapter.title}>
                <Link
                  href={`${course.slug}/${slug}/${chapter.slug}`}
                >
                  <UnstyledButton key={chapter.title}>
                    <Group>
                      <IconVideo size={20} stroke={2} />
                      <div>
                        <Text>{chapter.title}</Text>
                        <Text size="xs" color="dimmed">
                          {~~(Math.random() * 10) + 1} hours{" "}
                          {~~(Math.random() * 10) + 1} min
                        </Text>
                      </div>
                    </Group>
                  </UnstyledButton>
                </Link>
              </Box>
            ))}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
