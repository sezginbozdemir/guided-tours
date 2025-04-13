"use client";
import { Group, Menu, Title } from "@mantine/core";
import { FiChevronDown } from "react-icons/fi";
import classes from "../../index.module.css";
import Link from "next/link";
import { Location } from "@/types/globals";

interface Props {
  locations: Location[];
}

const links = [
  { name: "Home", path: "/" },
  { name: "Popular Tours", type: "dropdown" },
  { name: "Turkey Tours", path: "/tours?location=turkey" },
  { name: "Other Tours", type: "dropdown-dynamic" },
  { name: "Contact", path: "/contact" },
];

const MenuItems = ({ locations }: Props) => {
  const popularLocations = locations.filter((loc) => loc.popular);
  const otherLocations = locations.filter((loc) => !loc.popular);

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
                {popularLocations.map((loc, idx) => (
                  <Link
                    key={idx}
                    href={`/tours?location=${loc.name.toLowerCase()}`}
                  >
                    <Menu.Item>{loc.name} Tours</Menu.Item>
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
                {otherLocations.map((loc, idx) => (
                  <Link
                    key={idx}
                    href={`/tours?location=${loc.name.toLowerCase()}`}
                  >
                    <Menu.Item>{loc.name} Tours</Menu.Item>
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
