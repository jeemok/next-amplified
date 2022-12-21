import { IconVideo } from "@tabler/icons";

import { useRouter } from "next/router";
import {
  Box,
  Accordion,
  Container,
  Tabs,
  UnstyledButton,
  Group,
  Grid,
  Text,
} from "@mantine/core";
import React from "react";
import Link from "next/link";
import { getServerSideProps } from "../../../src/helpers/enrollment-auth";
import Header from "../../../src/components/CourseMain/Header";
import courses from '../courses';

export { getServerSideProps };


export default function CourseList() {
  const router = useRouter();
  const course = courses.find(c => c.slug === router.pathname.split('/')[2]);

  if (!course) {
    return <div>error: course not found!</div>
  }

  const { modules } = course;

  return (
    <>
      <Header
        title="Getting Started with Gift-Ed"
        description="This course offers an honest understanding of the world we live in, including the existential threats facing humanity and the societal traumas we have inadvertently created. It provides a deep appreciation of the challenges presented by modern civilisation and the immense possibilities for change when we recognise and accept the root causes of the crises we face."
      />
      <Container mt={50}>
        <Tabs defaultValue="course-outline">
          <Tabs.List>
            <Tabs.Tab value="course-outline">Course Outline</Tabs.Tab>
            <Tabs.Tab value="discussion">Discussion</Tabs.Tab>
            <Tabs.Tab value="downloads">Downloads</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="course-outline" pt="xs">
            <Accordion multiple>
              {modules.map(({ title, description, chapters }, index) => (
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
                          href={`${router.pathname}/chapters/${chapter.slug}`}
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
          </Tabs.Panel>

          <Tabs.Panel value="discussion" pt="xs">
            Second tab color is blue, it gets this value from props, props have
            the priority and will override context value
          </Tabs.Panel>

          <Tabs.Panel value="downloads" pt="xs">
            Second tab color is blue, it gets this value from props, props have
            the priority and will override context value
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
}
