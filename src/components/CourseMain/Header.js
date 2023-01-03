import {
  Box,
  createStyles,
  Overlay,
  Container,
  Title,
  Button,
  Text,
} from "@mantine/core";
import Link from "next/link";
import VideoJS from "../Common/VideoJS";
import CourseUtils from "../../utils/course";

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage:
      "url(https://lms.gift-ed.com/static/gifted_theme/images/login-reg-bg.8900416d4f85.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingTop: theme.spacing.xl * 6,
    paddingBottom: theme.spacing.xl * 6,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      paddingBottom: theme.spacing.xl * 3,
    },
  },

  title: {
    marginTop: theme.spacing.xl,
    color: theme.white,
    fontSize: 50,
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 800,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: theme.spacing.xl * 1.5,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export default function Header({ course }) {
  const { classes } = useStyles();
  const { title, description, trailer, modules } = course;

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container}>
        {trailer && (
          <Box w="100%">
            <VideoJS options={trailer.options} />
          </Box>
        )}

        <Title className={classes.title}>{title}</Title>
        <Text className={classes.description} size="md" mt="xl">
          {description}
        </Text>

        <Link
          href={CourseUtils.constructChapterUrl(
            course,
            modules && modules[0],
            modules && modules[0]?.chapters[0]
          )}
        >
          <Button
            variant="gradient"
            size="lg"
            radius="xl"
            className={classes.control}
          >
            Start course
          </Button>
        </Link>
      </Container>
    </div>
  );
}
