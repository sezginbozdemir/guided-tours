"use client";
import { Group, Menu, Text } from "@mantine/core";
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
  { name: "Destinations", type: "destinations" },
  { name: "Other Tours", type: "dropdown-dynamic" },
  { name: "Contact", path: "/contact" },
];

const MenuItems = ({ locations }: Props) => {
  const popularLocations = locations.filter((loc) => loc.popular);
  const otherLocations = locations.filter((loc) => !loc.popular);

  return (
    <Group gap={15} justify="space-between">
      {links.map((link, index) => {
        if (link.type === "dropdown") {
          return (
            <Menu key={index} trigger="hover">
              <Menu.Target>
                <Text className={classes.targetGroup} fw={450} size="lg">
                  {link.name} <FiChevronDown size={17} />
                </Text>
              </Menu.Target>
              <Menu.Dropdown className={classes.dropdown}>
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
        if (link.type === "destinations") {
          return (
            <Menu key={index} trigger="hover">
              <Menu.Target>
                <Text className={classes.targetGroup} fw={450} size="lg">
                  {link.name} <FiChevronDown size={17} />
                </Text>
              </Menu.Target>
              <Menu.Dropdown className={classes.dropdown}>
                {locations.map((loc, idx) => (
                  <Link key={idx} href={`/destinations/${loc.id}`}>
                    <Menu.Item>{loc.name}</Menu.Item>
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
                <Text className={classes.targetGroup} fw={450} size="lg">
                  {link.name} <FiChevronDown size={17} />
                </Text>
              </Menu.Target>
              <Menu.Dropdown className={classes.dropdown}>
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
            <Text fw={450} size="lg">
              {link.name}
            </Text>
          </Link>
        );
      })}
    </Group>
  );
};

export default MenuItems;
