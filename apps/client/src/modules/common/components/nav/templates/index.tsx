"use client";
import { Box, Container, Group, TextInput, Title } from "@mantine/core";
import MenuItems from "../components/menu";
import classes from "../index.module.css";
import { Location } from "@/types/globals";
import { useMediaQuery } from "@mantine/hooks";
import { RxHamburgerMenu } from "react-icons/rx";

interface Props {
  locations: Location[];
}

const NavTemplate = ({ locations }: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  return (
    <Box className={classes.navContainer}>
      <Container size="xl" w="100%">
        <Group h={60} justify="space-between">
          <Group gap={40}>
            <Title order={1}>LOGO</Title>
            {!isMobile && <MenuItems locations={locations} />}
          </Group>
          {!isMobile && !isTablet && (
            <Box className={classes.searchBox}>
              <TextInput />
            </Box>
          )}
          {isMobile && <RxHamburgerMenu size={25} />}
        </Group>
      </Container>
    </Box>
  );
};
export default NavTemplate;
