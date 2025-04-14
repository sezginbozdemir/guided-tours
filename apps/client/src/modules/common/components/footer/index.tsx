import {
  Text,
  Group,
  Divider,
  Anchor,
  Container,
  Title,
  Stack,
} from "@mantine/core";
import { FaCcVisa, FaCcMastercard, FaTripadvisor } from "react-icons/fa";
import classes from "./index.module.css";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";

const footerLinks = {
  Help: [{ label: "F.A.Q.", path: "/faq" }],
  Links: [
    { label: "Home", path: "/" },
    { label: "Tours", path: "/tours" },
    { label: "Contact us", path: "/contact" },
  ],
  Company: [
    { label: "About Us", path: "/about" },
    { label: "Terms and Conditions", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Cancellation Policy", path: "/cancellation" },
    { label: "Cookie Policy", path: "/cookies" },
  ],
};

const Footer = () => {
  return (
    <Container size="xl">
      <Group justify="space-between" align="start">
        <Stack>
          <Title order={2}>LOGO</Title>
          <Text>Address: 1234 Your Street, City, Country</Text>
          <Text>Phone: +1 (234) 567-890</Text>
          <Text>Email: info@example.com</Text>
          <Group>
            <FaCcVisa size={40} />
            <FaCcMastercard size={40} />
            <FaTripadvisor size={40} />
          </Group>
        </Stack>
        <Group align="start" gap={100} justify="space-between">
          {Object.entries(footerLinks).map(([title, links]) => (
            <Stack key={title}>
              <Title order={3} mb={10}>
                {title}
              </Title>
              {links.map((link, idx) => (
                <Anchor key={idx} href={link.path} size="sm">
                  {link.label}
                </Anchor>
              ))}
            </Stack>
          ))}
        </Group>
      </Group>

      <Divider my="md" />
      <Group justify="space-between">
        <Text size="sm">&copy; 2025 All Rights Reserved.</Text>
        <Group>
          <Link href="/">
            <AiFillFacebook size={25} />
          </Link>
          <Link href="/">
            <AiFillInstagram size={25} />
          </Link>
        </Group>
      </Group>
    </Container>
  );
};

export default Footer;
