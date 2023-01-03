import React from "react";
import {
  Avatar,
  Divider,
  Group,
  Grid,
  Text,
  Stack,
} from "@mantine/core";

export default function About({ course }) {
  const { description, learningOutcomes, courseStructure, hosts, speakers } =
    course;
  return (
    <>
      <Grid py="xl">
        <Grid.Col xs={12} sm={4}>
          <Text size="lg" fw="bold" pt="xs">
            Description
          </Text>
        </Grid.Col>
        <Grid.Col xs={12} sm={8}>
          <Text size="sm">{description}</Text>
        </Grid.Col>
      </Grid>

      <Divider />

      <Grid py="xl">
        <Grid.Col xs={12} sm={4}>
          <Text size="lg" fw="bold" pt="xs">
            Learning outcomes
          </Text>
        </Grid.Col>
        <Grid.Col xs={12} sm={8}>
          <Text size="sm" pt="xs" pb="md">
            {learningOutcomes}
          </Text>
        </Grid.Col>
      </Grid>

      <Divider />

      <Grid py="xl">
        <Grid.Col xs={12} sm={4}>
          <Text size="lg" fw="bold" pt="xs">
            Course structure
          </Text>
        </Grid.Col>
        <Grid.Col xs={12} sm={8}>
          <Text size="sm" pt="xs" pb="md">
            {courseStructure}
          </Text>
        </Grid.Col>
      </Grid>

      <Divider />

      <Grid py="xl">
        <Grid.Col xs={12} sm={4}>
          <Text size="lg" fw="bold" pt="xs">
            Speakers
          </Text>
        </Grid.Col>
        <Grid.Col xs={12} sm={8}>
          <Stack>
            {React.Children.toArray(
              speakers?.map((speaker) => (
                <Group spacing="md">
                  <Avatar size={60} radius={60} src={speaker.image} />
                  <div>
                    <Text size="sm" weight={500}>
                      {speaker.name}
                    </Text>
                    <Text size="xs" color="dimmed">
                      {speaker.designation}
                    </Text>
                  </div>
                </Group>
              ))
            )}
          </Stack>
        </Grid.Col>

        <Grid.Col xs={12} sm={4}>
          <Text size="lg" fw="bold" pt="xs">
            Host
          </Text>
        </Grid.Col>
        <Grid.Col xs={12} sm={8}>
          <Stack>
            {React.Children.toArray(
              hosts?.map((host) => (
                <Group spacing="md">
                  <Avatar size={60} radius={60} src={host.image} />
                  <div>
                    <Text size="sm" weight={500}>
                      {host.name}
                    </Text>
                    <Text size="xs" color="dimmed">
                      {host.designation}
                    </Text>
                  </div>
                </Group>
              ))
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
}
