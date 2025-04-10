"use client";
import { Group, Menu, Title } from "@mantine/core";
import { FiChevronDown } from "react-icons/fi";
import classes from "../../index.module.css";
import Link from "next/link";

interface Props {
  locations: string[];
}

const links = [
  { name: "Home", path: "/" },
  {
    name: "Popular Tours",
    type: "dropdown",
    items: [
      { name: "Istanbul", path: "/tours?location=istanbul" },
      { name: "Cappadocia", path: "/tours?location=cappadocia" },
      { name: "Ephesus", path: "/tours?location=ephesus" },
      { name: "Pamukkale", path: "/tours?location=pamukkale" },
      { name: "All", path: "/tours" },
    ],
  },
  { name: "Turkey Tours", path: "/tours?location=turkey" },

  {
    name: "Other Tours",
    type: "dropdown-dynamic",
  },
  { name: "Contact", path: "/" },
];

const MenuItems = ({ locations }: Props) => {
  const predefinedLocations =
    links
      .find((link) => link.type === "dropdown")
      ?.items?.map((item) => item.name.toLowerCase()) || [];

  const filteredLocations = locations.filter(
    (location) => !predefinedLocations.includes(location.toLowerCase())
  );
  return (
    <Group gap={30} justify="space-between">
      {links.map((link, index) => {
        if (link.type === "dropdown") {
          return (
            <Menu key={index} trigger="hover">
              <Menu.Target>
                <Title order={5}>
                  {link.name} <FiChevronDown size={20} />
                </Title>
              </Menu.Target>
              <Menu.Dropdown>
                {link.items?.map((item, idx) => (
                  <Link key={idx} href={item.path}>
                    <Menu.Item>{item.name} Tours</Menu.Item>
                  </Link>
                ))}
              </Menu.Dropdown>
            </Menu>
          );
        }

        if (link.type === "dropdown-dynamic") {
          return (
            <Menu key={index} trigger="hover">
              <Menu.Target>
                <Title order={5}>
                  {link.name} <FiChevronDown size={20} />
                </Title>
              </Menu.Target>
              <Menu.Dropdown>
                {filteredLocations.map((loc, idx) => (
                  <Link key={idx} href={`/tours?location=${loc}`}>
                    <Menu.Item>{loc} Tours</Menu.Item>
                  </Link>
                ))}
              </Menu.Dropdown>
            </Menu>
          );
        }
        return (
          <Link key={index} href={link.path!} className={classes.navLink}>
            <Title order={5}>{link.name}</Title>
          </Link>
        );
      })}
    </Group>
  );
};

export default MenuItems;
