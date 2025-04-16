"use client";
import classes from "./theme.module.css";
import {
  Breadcrumbs,
  createTheme,
  Pagination,
  Text,
  Title,
} from "@mantine/core";
import "./src/styles/globals.css";
import { Carousel } from "@mantine/carousel";
export const theme = createTheme({
  fontFamily: "DM Sans",
  headings: {
    fontFamily: "Poppins",
  },

  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
  components: {
    Title: Title.extend({
      classNames: {
        root: classes.heading,
      },
    }),
    Text: Text.extend({
      classNames: {
        root: classes.text,
      },
    }),
    Carousel: Carousel.extend({
      classNames: {
        control: classes.carouselControl,
        root: classes.carouselRoot,
      },
    }),
    Breadcrumbs: Breadcrumbs.extend({
      classNames: {
        root: classes.breadcrumbs,
      },
    }),
    Pagination: Pagination.extend({
      classNames: {
        control: classes.paginationControl,
      },
    }),
  },
});
