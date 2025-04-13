import { Box, Group, Title } from "@mantine/core";
import classes from "./index.module.css";
import Image from "next/image";
const imgUrls = ["/hero/hero-01.png", "/hero/hero-02.png", "/hero/hero-03.png"];

const Hero = () => {
  return (
    <Group h={450} mt={10} mb={30} gap={0}>
      {imgUrls.map((imgUrl, index) => (
        <Box key={index} className={classes.imgBox}>
          <Image src={imgUrl} alt="Istanbul Tours" fill />
        </Box>
      ))}
    </Group>
  );
};
export default Hero;
