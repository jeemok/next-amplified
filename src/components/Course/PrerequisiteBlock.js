import React from "react";
import Link from "next/link";
import { Center, Box, Text, Stack } from "@mantine/core";
import { IconLockAccess } from "@tabler/icons";

export const PrerequisiteBlock = ({ prerequisiteLink }) => {
  return (
    <Center my="20vh">
      <Stack align="center">
        <Box>
          <IconLockAccess size={100} />
        </Box>
        <Text size="lg" fw="bold">
          Chapter locked.
        </Text>
        <Text size="sm">
          You need to complete the{" "}
          <Link href={prerequisiteLink}>
            <Text color="red" sx={{ display: "inline-block" }}>
              pre-requisite chapter
            </Text>
          </Link>{" "}
          first.
        </Text>
      </Stack>
    </Center>
  );
};

export default PrerequisiteBlock;
