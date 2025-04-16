import {
  Text,
  Group,
  Divider,
  Anchor,
  Container,
  Title,
  Stack,
  Box,
} from "@mantine/core";
import {
  FaCcVisa,
  FaCcMastercard,
  FaTripadvisor,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import Link from "next/link";
import classes from "./index.module.css";

const footerLinks = {
  Help: [
    { label: "F.A.Q.", path: "/faq" },
    { label: "About Us", path: "/about" },
  ],
  Links: [
    { label: "Home", path: "/" },
    { label: "Tours", path: "/tours" },
    { label: "Contact us", path: "/contact" },
  ],
  Company: [
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Cancellation Policy", path: "/cancellation" },
    { label: "Cookie Policy", path: "/cookies" },
  ],
};

const Footer = () => {
  return (
    <Container size="xl">
      <Box className={classes.footerWrapper}>
        <Group
          className={classes.brandGroup}
          justify="space-between"
          align="start"
          wrap="wrap"
        >
          <Stack gap="xs" className={classes.brand}>
            <Title order={1}>LOGO</Title>
            <Text size="md">1234 Your Street, City, Country</Text>
            <Text size="md">Phone: +1 (234) 567-890</Text>
            <Text size="md">Email: info@example.com</Text>
            <Group mt="xs">
              <FaCcVisa size={48} />
              <FaCcMastercard size={48} />
              <FaTripadvisor size={48} />
            </Group>
          </Stack>

          <Group className={classes.links} align="start" gap={150} wrap="wrap">
            {Object.entries(footerLinks).map(([section, links]) => (
              <Stack key={section} gap="xs">
                <Title order={4}>{section}</Title>
                {links.map((link, i) => (
                  <Link key={i} href={link.path}>
                    {link.label}
                  </Link>
                ))}
              </Stack>
            ))}
          </Group>
        </Group>

        <Divider my="lg" />
        <Group justify="space-between" wrap="wrap">
          <Text size="md">&copy; 2025 All rights reserved.</Text>
          <Group gap="md">
            <Anchor component={Link} href="/" className={classes.socialIcon}>
              <FaFacebookF />
            </Anchor>
            <Anchor component={Link} href="/" className={classes.socialIcon}>
              <FaInstagram />
            </Anchor>
          </Group>
        </Group>
      </Box>
    </Container>
  );
};

export default Footer;
