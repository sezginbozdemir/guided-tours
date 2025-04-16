"use client";
import {
  Box,
  Divider,
  Group,
  Stack,
  Title,
  Text,
  Transition,
  Paper,
} from "@mantine/core";
import classes from "./index.module.css";
import { Location, Tour } from "@/types/globals";
import Image from "next/image";
import TourGrid from "@/modules/common/components/tour-grid";
import { HiArrowRight } from "react-icons/hi";
import BookButton from "@/modules/common/components/buttons/book-now";
import { BiChevronDown } from "react-icons/bi";
import { useState } from "react";
import { useClickOutside } from "@mantine/hooks";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  location: Location;
  tours: Tour[];
}

const scaleY = {
  in: { opacity: 1, transform: "scaleY(1)" },
  out: { opacity: 0, transform: "scaleY(0)" },
  common: { transformOrigin: "top" },
  transitionProperty: "transform, opacity",
};
function toggleStringInArray(array: string[], item: string): string[] {
  return array.includes(item)
    ? array.filter((i) => i !== item)
    : [...array, item];
}
const DestinationTours = ({ tours, location }: Props) => {
  const [opened, setOpened] = useState(false);
  const [openedTags, setOpenedTags] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const clickOutsideRef = useClickOutside(() => setOpened(false));
  const clickOutsideRefTags = useClickOutside(() => setOpenedTags(false));

  const labels = Array.from(new Set(tours.flatMap((tour) => tour.label || [])));
  const tags = Array.from(new Set(tours.flatMap((tour) => tour.tags || [])));

  const handleLabelClick = (label: string) => {
    setSelectedLabels((prev) => toggleStringInArray(prev, label));
  };
  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => toggleStringInArray(prev, tag));
  };
  const filteredTours = tours.filter((tour) => {
    const matchesLabel =
      selectedLabels.length === 0 ||
      (tour.label && selectedLabels.includes(tour.label));

    const matchesTag =
      selectedTags.length === 0 ||
      (tour.tags && tour.tags.some((tag) => selectedTags.includes(tag)));

    return matchesLabel && matchesTag;
  });

  return (
    <Stack>
      <Box className={classes.imgBox}>
        <Image
          src={`${API_URL}${location.images[0]}`}
          fill
          alt={location.name}
        />
        <Title className={classes.locTitle} order={1} fw={500}>
          {location.name}
        </Title>
        <Box className={classes.overlay} />
      </Box>
      <Box className={classes.gridBox}>
        <Group justify="space-between" align="center" mb={10}>
          <Title className={classes.sliderHeader} order={3} fw={450}>
            Top {location.name} Tours <HiArrowRight size={18} />
          </Title>
          <Group>
            <Text size="md" c="dimmed">
              Filter by:
            </Text>
            <Box ref={clickOutsideRef} className={classes.transitionBox}>
              <BookButton
                className={classes.transitionButton}
                onClick={() => setOpened((prev) => !prev)}
              >
                Labels <BiChevronDown size={15} />{" "}
                {selectedLabels.length > 0 && selectedLabels.length}
              </BookButton>
              <Transition
                mounted={opened}
                transition={scaleY}
                duration={200}
                timingFunction="ease"
                keepMounted
              >
                {(transitionStyle) => (
                  <Paper
                    className={classes.transitionPaper}
                    shadow="md"
                    style={{ ...transitionStyle }}
                  >
                    {labels.map((label, i) => (
                      <Text
                        className={classes.transitionText}
                        key={i}
                        size="sm"
                        fw={400}
                        onClick={() => handleLabelClick(label)}
                      >
                        {label} {selectedLabels.includes(label) ? "✓" : ""}
                      </Text>
                    ))}
                  </Paper>
                )}
              </Transition>
            </Box>
            <Box ref={clickOutsideRefTags} className={classes.transitionBox}>
              <BookButton
                className={classes.transitionButton}
                onClick={() => setOpenedTags((prev) => !prev)}
              >
                Tags <BiChevronDown size={15} />
                {selectedTags.length > 0 && selectedTags.length}
              </BookButton>
              <Transition
                mounted={openedTags}
                transition={scaleY}
                duration={200}
                timingFunction="ease"
                keepMounted
              >
                {(transitionStyle) => (
                  <Paper
                    className={classes.transitionPaper}
                    shadow="md"
                    style={{ ...transitionStyle }}
                  >
                    {tags.map((tag, i) => (
                      <Text
                        className={classes.transitionText}
                        key={i}
                        size="sm"
                        fw={400}
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag} {selectedTags.includes(tag) ? "✓" : ""}
                      </Text>
                    ))}
                  </Paper>
                )}
              </Transition>
            </Box>
          </Group>
        </Group>

        <Divider mb={30} />

        <TourGrid tours={filteredTours} />
      </Box>
    </Stack>
  );
};
export default DestinationTours;
