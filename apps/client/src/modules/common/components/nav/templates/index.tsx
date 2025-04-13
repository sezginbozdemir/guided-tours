import { Box, Container, Group, TextInput, Title } from "@mantine/core";
import MenuItems from "../components/menu";
import classes from "../index.module.css";
import { Location } from "@/types/globals";

interface Props {
  locations: Location[];
}

const NavTemplate = ({ locations }: Props) => {
  return (
    <Box className={classes.navContainer}>
      <Container size="xl" w="100%">
        <Group h={70} justify="space-between">
          <Group gap={40}>
            <Title order={1}>LOGO</Title>
            <MenuItems locations={locations} />
          </Group>
          <Box w="400px" className={classes.searchBox}>
            <TextInput />
          </Box>
        </Group>
      </Container>
    </Box>
  );
};
export default NavTemplate;
