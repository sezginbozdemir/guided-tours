import { fetchAllLocations } from "@/lib/data/locations";
import { fetchAllTours } from "@/lib/data/tours";
import HomeTemplate from "@/modules/home/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guided Istanbul Tours",
  description: "Turkey Tours",
};

export default async function Home() {
  const tours = await fetchAllTours();
  const locations = await fetchAllLocations();
  return <HomeTemplate tours={tours} locations={locations} />;
}
