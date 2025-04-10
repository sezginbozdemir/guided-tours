import { Anchor, Box, Breadcrumbs, Container, Group } from "@mantine/core";
import { Tour } from "@/types/globals";
import TourList from "@/modules/common/components/tour-list";
import classes from "./index.module.css";

interface Props {
  tours: Tour[];
  location?: string;
}
const capitalizeFirstLetter = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
const ToursTemplate: React.FC<Props> = ({ tours, location }) => {
  const locationUrl = `?location=${location}`;
  const items = [
    { title: "Home", href: "/" },
    {
      title: `${location ? capitalizeFirstLetter(location) : ""} Tours`,
      href: `/tours${location ? locationUrl : ""}`,
    },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Container size="xl" w="100%">
        <Breadcrumbs separator="/">{items}</Breadcrumbs>
        <Group mt={30} mb={30} align="start" w="100%" h="100%" gap={5}>
          <Box className={classes.box}>Filters</Box>
          <Box style={{ display: "flex", flex: 1 }}>
            <TourList tours={tours} />
          </Box>
        </Group>
      </Container>
    </>
  );
};
export default ToursTemplate;
