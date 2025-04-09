import { Box, Container, Group, TextInput, Title } from "@mantine/core";
import classes from "./index.module.css";
import Link from "next/link";

const links = [
  { name: "Home", path: "/" },
  { name: "Popular Tours", path: "/" },
  { name: "Turkey Tours", path: "/" },
  { name: "Other Tours", path: "/" },
  { name: "Contact", path: "/" },
];
const Nav = () => {
  return (
    <Box className={classes.navContainer}>
      <Container size="xl" w="100%">
        <Group h={70} justify="space-between">
          <Group gap={40}>
            <Title order={1}>LOGO</Title>{" "}
            <Group gap={30} justify="space-between">
              {links.map((link, index) => (
                <Link key={index} href={link.path} className={classes.navLink}>
                  <Title order={5}>{link.name}</Title>
                </Link>
              ))}
            </Group>
          </Group>
          <Box w="400px" className={classes.searchBox}>
            <TextInput />
          </Box>
        </Group>
      </Container>
    </Box>
  );
};
export default Nav;
