import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },

  mobileImage: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  desktopImage: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function Unassigned() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
      >
        <Image
          src={"https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg"}
          className={classes.mobileImage}
        />
        <div>
          <Title className={classes.title}>Restricted</Title>
          <Text color="dimmed" size="lg">
            We are sorry, but the course you are trying to access is restricted.
            You may have not assigned to the course, or the course has been
            moved to another URL. If you think this is an error please contact
            support.
          </Text>
          <Link href="/">
            <Button
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}
            >
              Get back to home page
            </Button>
          </Link>
        </div>
        <Image
          src={"https://ui.mantine.dev/_next/static/media/image.11cd6c19.svg"}
          className={classes.desktopImage}
        />
      </SimpleGrid>
    </Container>
  );
}
