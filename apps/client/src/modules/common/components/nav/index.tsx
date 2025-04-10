import { fetchAllTours } from "@/lib/data/tours";
import NavTemplate from "./templates";

const Nav = async () => {
  const tours = await fetchAllTours();
  const locations = Array.from(new Set(tours.map((tour) => tour.location)));
  return <NavTemplate locations={locations} />;
};
export default Nav;
