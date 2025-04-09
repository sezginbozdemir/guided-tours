import { fetchAllTours } from "@/lib/data/tours";
import HomeTemplate from "@/modules/home/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guided Istanbul Tours",
  description: "Turkey Tours",
};

export default async function Home() {
  const tours = await fetchAllTours();
  return <HomeTemplate tours={tours} />;
}
