import React from "react";
import { Box, Image, Group, Text } from "@mantine/core";

export default function Downloads({ infographics }) {
  if (!infographics) {
    return <Text size="sm">No downloadable contents.</Text>;
  }

  return (
    <Box>
      <Text size="sm">
        <Group spacing="xs" my="sm">
          Download:
          <a
            href={infographics.pdf}
            target="_blank"
            style={{ color: "#df2644" }}
          >
            PDF
          </a>
          {" | "}
          <a
            href={infographics.jpeg}
            target="_blank"
            style={{ color: "#df2644" }}
          >
            JPEG
          </a>
        </Group>
      </Text>
      <Image src={infographics.jpeg} />
    </Box>
  );
}
