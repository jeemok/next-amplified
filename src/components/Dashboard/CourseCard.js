import { IconClockHour4 } from "@tabler/icons";
import {
  Card,
  Image,
  Text,
  Group,
  Button,
  createStyles,
  Progress,
} from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  card: {
    width: "100%",
    maxWidth: 300,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  titleContainer: {
    minHeight: 300,
  },

  section: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

export default function BadgeCard({ image, title, slug, duration, progress }) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group mih={100} align="flex-start">
          <Text size="lg" weight={500}>
            {title}
          </Text>
        </Group>

        <Group position="left" spacing={5}>
          <IconClockHour4 size={18} stroke={1.5} />
          <Text size="xs">{duration}</Text>
        </Group>

        <Text color="dimmed" size="sm" mt="md">
          <Text
            span
            weight={500}
            sx={(theme) => ({
              color: theme.colorScheme === "dark" ? theme.white : theme.black,
            })}
          >
            {progress}%
          </Text>{" "}
          completed
        </Text>
        <Progress value={(progress / 100) * 100} mt={5} />
      </Card.Section>
      <Card.Section>
        <Group p="md" mb="xs">
          <Link href={`/courses/${slug}`}>
            <Button radius="xl" px={30}>
              View course
            </Button>
          </Link>
        </Group>
      </Card.Section>
    </Card>
  );
}
