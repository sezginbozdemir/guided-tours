import { Box, Group, Stack, Text, Title, Divider } from "@mantine/core";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import classes from "./index.module.css";

const Socials = () => {
  return (
    <Box className={classes.socialsContainer}>
      <Stack gap="sm">
        <Title pb={30} fw={500} order={3}>
          Get in Touch
        </Title>

        <Group className={classes.contactBox}>
          <MdPhone className={classes.contactIcon} />
          <Text>+90 123 456 78 90</Text>
        </Group>
        <Group className={classes.contactBox}>
          <MdEmail className={classes.contactIcon} />
          <Text>info@example.com</Text>
        </Group>
        <Group className={classes.contactBox}>
          <MdLocationOn className={classes.contactIcon} />
          <Text>Istanbul, Turkey</Text>
        </Group>

        <Divider my="sm" />

        <Group justify="center" gap="md">
          <Box className={`${classes.iconBox} ${classes.facebook}`}>
            <FaFacebookF />
          </Box>
          <Box className={`${classes.iconBox} ${classes.instagram}`}>
            <FaInstagram />
          </Box>
          <Box className={`${classes.iconBox} ${classes.twitter}`}>
            <FaTwitter />
          </Box>
        </Group>
      </Stack>
    </Box>
  );
};

export default Socials;
