import { IconVideo, IconBook2, IconMessages } from "@tabler/icons";
import { useRouter } from "next/router";
import {
  Button,
  Divider,
  Box,
  Accordion,
  Container,
  Checkbox,
  Group,
  UnstyledButton,
  Spoiler,
  Grid,
  Text,
  Stack,
} from "@mantine/core";
import { getServerSideProps } from "../../../../src/helpers/enrollment-auth";
import Link from "next/link";
import React from "react";
import courses from '../../courses';
import SideNav from '../../../../src/components/Course/SideNav';

export { getServerSideProps };

export default function CourseList() {
  const router = useRouter();
  const course = courses.find(c => c.slug === router.pathname.split('/')[2]);

  if (!course) {
    return <div>error: course not found!</div>
  }

  const { references, downloads, modules } = course;
  
  return (
    <>
      <Container size="xl">
        <Grid>
          <Grid.Col xs={8}>
            {/* https://www.npmjs.com/package/video.js */}
            {/* https://videojs.com/guides/react/ */}
            <video
              id="video1"
              name="c1-trailer"
              className="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"
              controls
              poster="https://d2qfs6i220e922.cloudfront.net/Why+GIFTed/thumbnail/Why-GIFTed.jpg"
              preload="true"
              data-setup='{ "playbackRates": [1, 1.25, 1.5, 1.75, 2] }'
            >
              <source src="https://d2qfs6i220e922.cloudfront.net/Why GIFTed/m3u8/Why GIFTed_V7_1.m3u8"></source>
            </video>

            <Box my="lg">
              <Text size="xl" fw="bold" mb="sm">
                Course Trailer
              </Text>

              <Spoiler
                maxHeight={120}
                showLabel={
                  <Text size="xs" mt="lg">
                    Show more
                  </Text>
                }
                hideLabel={
                  <Text size="xs" mt="lg">
                    Hide
                  </Text>
                }
              >
                <Stack>
                  <Text size="sm">
                    Gain a critical understanding of the greatest challenges of
                    our time, how we must redesign society to overcome them and
                    thrive, and find out how can each of us find purpose in the
                    different spheres of our life and contribute to redesigning
                    society.
                  </Text>
                  <Text size="sm">
                    This course offers an honest understanding of the world we
                    live in, including the existential threats facing humanity
                    and the societal traumas we have inadvertently created. It
                    provides a deep appreciation of the challenges presented by
                    modern civilisation and the immense possibilities for change
                    when we recognise and accept the root causes of the crises
                    we face.
                  </Text>
                  <Text size="sm">
                    What are the greatest challenges of our times and how do we
                    confront them head-on? How can societies be redesigned to
                    overcome these challenges and thrive? How can each of us
                    find purpose in the different spheres of our life and
                    contribute to redesigning society?
                  </Text>
                </Stack>
              </Spoiler>
            </Box>

            <Divider my="sm" />

            <Box my="lg">
              <Text size="lg" fw="bold" mb="sm">
                References
              </Text>

              <Stack>
                {references.map((reference) => (
                  <UnstyledButton key={reference.title} ml={10}>
                    <Group>
                      <IconVideo size={20} stroke={1.5} />
                      <Text fw={500} size="sm">
                        {reference.title}
                      </Text>
                    </Group>
                  </UnstyledButton>
                ))}
              </Stack>
            </Box>

            <Box my="lg">
              <Text size="lg" fw="bold" mb="sm">
                Downloads
              </Text>

              <Stack>
                {downloads.map((download) => (
                  <UnstyledButton key={download.title} ml={10}>
                    <Group>
                      <IconBook2 size={20} stroke={1.5} />
                      <Text fw={500} size="sm">
                        {download.title}
                      </Text>
                    </Group>
                  </UnstyledButton>
                ))}
              </Stack>
            </Box>

            <Divider my="sm" />
            <Box my="lg">
              <Group>
                <IconMessages size={40} stroke={1.5} />
                <Box maw={550}>
                  <Text size="lg" fw="bold">
                    Connect with other learners
                  </Text>
                  <Text size="sm">
                    Join the discussion with fellow learners. Share your
                    thoughts, learnings and dive deeper into the topic.
                  </Text>
                </Box>
                <Button variant="outline">Join the discussion</Button>
              </Group>
            </Box>
          </Grid.Col>

          <Grid.Col xs={4}>
            <SideNav modules={modules} />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
