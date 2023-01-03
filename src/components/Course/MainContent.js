import React from "react";
import DOMPurify from "dompurify";
import { IconMessages, IconFileDownload } from "@tabler/icons";
import {
  Button,
  Divider,
  Box,
  Group,
  Spoiler,
  Text,
  Stack,
  Image,
  UnstyledButton,
  TextInput,
} from "@mantine/core";
import VideoJS from '../Common/VideoJS';

// TODO: Somehow dynamic import not working, placing it here first
import Course3ReflectionRiskMap from "../CourseContent/DragAndDrop/course3-reflection1-riskmap";

export const MainContent = ({ content, onComplete }) => {
  switch (content.type) {
    case "divider":
      return <Divider my="lg" />;
    case "video":
      return <VideoJS options={content.options} onEnded={() => onComplete()} />;
    case "transcript":
      return (
        <Box mt="xl">
          <IconFileDownload
            size={20}
            style={{ verticalAlign: "middle", marginRight: 5 }}
          />
          <Text size="sm" style={{ display: "inline-block" }}>
            <a href={content.link} target="_blank" style={{ color: "#df2644" }}>
              Download Transcript (PDF)
            </a>
          </Text>
        </Box>
      );
    case "title":
      return (
        <Text size={content.size || "xl"} fw="bold" mt="lg">
          {content.value}
        </Text>
      );
    case "text":
      return (
        <Text size="sm">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content.html),
            }}
          />
        </Text>
      );
    case "image":
      return <Image alt={content.alt} src={content.src} />;
    case "description":
      return (
        <Spoiler
          maxHeight={120}
          showLabel={<Text size="xs">Show more</Text>}
          hideLabel={<Text size="xs">Hide</Text>}
        >
          <Text size="sm">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content.html),
              }}
            />
          </Text>
        </Spoiler>
      );
    case "list":
      return (
        <Stack my="md">
          {content.list.map((each) => {
            const Icon = each.icon && require("@tabler/icons")[each.icon];
            return (
              <UnstyledButton key={each.label} ml={10}>
                <Group>
                  {each.icon && <Icon size={20} stroke={1.5} />}
                  <Text fw={500} size="sm">
                    {each.label}
                  </Text>
                </Group>
              </UnstyledButton>
            );
          })}
        </Stack>
      );
    case "podcast":
      return (
        <>
          <Box my="lg">
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="175"
              style={{
                width: "100%",
                maxWidth: 660,
                overflow: "hidden",
                background: "transparent",
              }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
              src={content.podcasts.apple.src}
            />
          </Box>
          <Text size="sm">
            You can also listen to this episode on{" "}
            <a
              href={content.podcasts.spotify}
              target="_blank"
              style={{ color: "#df2644" }}
            >
              Spotify
            </a>
            ,{" "}
            <a
              href={content.podcasts.anchor}
              target="_blank"
              style={{ color: "#df2644" }}
            >
              Anchor
            </a>
            , or{" "}
            <a
              href={content.podcasts.google}
              target="_blank"
              style={{ color: "#df2644" }}
            >
              Google Podcasts
            </a>
            .
          </Text>
        </>
      );
    case "discussion-cta":
      return (
        <Group my="lg">
          <IconMessages size={40} stroke={1.5} />
          <Box maw={550}>
            <Text size="lg" fw="bold">
              Connect with other learners
            </Text>
            <Text size="sm">
              Join the discussion with fellow learners. Share your thoughts,
              learnings and dive deeper into the topic.
            </Text>
          </Box>
          <Button variant="outline">Join the discussion</Button>
        </Group>
      );
    case "text-input":
      return (
        <>
          <TextInput label={content.label} />
          <Button my="lg" variant="outline">
            Submit
          </Button>
        </>
      );
    case "drag-and-drop": {
      return {
        "course3-reflection1-riskmap": <Course3ReflectionRiskMap />,
      }[content.id];
    }
    default: {
      return <div>Unknown error</div>;
    }
  }
};

export default MainContent;
