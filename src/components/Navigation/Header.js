import { useState } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Switch,
  Text,
  Menu,
  Image,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconSun, IconMoonStars } from "@tabler/icons";
import { Auth } from "aws-amplify";
import Link from "next/link";
import { useAppContext } from "../../contexts/global";

const LOGO_LIGHT = 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/xtnfh24s5duexxusw8il';
const LOGO_DARK = 'https://lms.gift-ed.com/static/gifted_theme/images/logo.60ca24482602.png';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

const user = {
  name: "Yi Ning",
  image:
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
};
const links = [
  { label: "referral", link: "https://www.gift-ed.com/referral" },
  { label: "leaderboard", link: "https://www.gift-ed.com/leaderboard" },
  { label: "support", link: "https://www.gift-ed.com/support" },
];

export default function HeaderTabs() {
  const { classes, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const theme = useMantineTheme();
  const { appTheme, setAppTheme } = useAppContext();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      // onClick={(event) => event.preventDefault()}
    >
      <Text size="xs">{link.label}</Text>
    </a>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="xl">
        <Group position="apart">
          <Group position="apart">
            <Link href="/">
              <Image
                width={60}
                height={60}
                fit="contain"
                src={appTheme.colorScheme === 'light' ? LOGO_LIGHT : LOGO_DARK}
              />
            </Link>

            <Group ml={10} spacing={5} className={classes.links}>
              {items}

              <Group position="center">
                <Switch
                  size="md"
                  color={theme.colorScheme === "dark" ? "gray" : "dark"}
                  onLabel={
                    <IconSun
                      size={16}
                      stroke={2.5}
                      color={theme.colors.yellow[4]}
                    />
                  }
                  offLabel={
                    <IconMoonStars
                      size={16}
                      stroke={2.5}
                      color={theme.colors.blue[6]}
                    />
                  }
                  onChange={(e) =>
                    setAppTheme((state) => ({
                      ...state,
                      colorScheme: e.target.checked ? "dark" : "light",
                    }))
                  }
                />
              </Group>
            </Group>
          </Group>

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />

          <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <Avatar
                    src={user.image}
                    alt={user.name}
                    radius="xl"
                    size={30}
                  />
                  <Text
                    weight={500}
                    size="sm"
                    sx={{ lineHeight: 1 }}
                    mr={3}
                    ml={5}
                  >
                    {user.name}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Resume your last course</Menu.Item>
              <Menu.Item>Dashboard</Menu.Item>
              <Menu.Item>Profile</Menu.Item>
              <Menu.Item>Account</Menu.Item>
              <Menu.Item onClick={() => Auth.signOut()}>Sign Out</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </div>
  );
}
