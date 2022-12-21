import { createStyles, Text, ActionIcon, Group, Image } from "@mantine/core";
import { IconBrandYoutube, IconBrandInstagram } from "@tabler/icons";
import { useAppContext } from "../../contexts/global";

const LOGO_LIGHT = 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/xtnfh24s5duexxusw8il';
const LOGO_DARK = 'https://lms.gift-ed.com/static/gifted_theme/images/logo.60ca24482602.png';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: "block",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

export default function FooterLinks() {
  const { classes } = useStyles();
  const { appTheme } = useAppContext();


  return (
    <footer className={classes.footer}>
      <Group position="center">
        <div className={classes.logo}>
          <Image
            alt="GIFT-ed logo"
            width={70}
            height={70}
            fit="contain"
            src={appTheme.colorScheme === 'light' ? LOGO_LIGHT : LOGO_DARK}
          />

          <Text size="sm" className={classes.description} mt={10}>
            About | Blog | Contact us
          </Text>

          <Group spacing={0} className={classes.social} my={5}>
            <ActionIcon size="lg">
              <IconBrandYoutube size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg">
              <IconBrandInstagram size={18} stroke={1.5} />
            </ActionIcon>
          </Group>

          <Text color="dimmed" size="xs" ta="center" my={5}>
            GIFT.ed. © 2022 All rights reserved.
          </Text>

          <Group position="center">
            <Text
              component="a"
              href={"https://www.gift-ed.com/terms-and-conditions"}
              size="sm"
            >
              Terms & Conditions
            </Text>
            <Text
              component="a"
              href={"https://www.gift-ed.com/privacy-policy"}
              size="sm"
            >
              Privacy Policy
            </Text>
          </Group>
        </div>
      </Group>
    </footer>
  );
}
