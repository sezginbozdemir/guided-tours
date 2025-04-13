import NavTemplate from "./templates";
import { fetchAllLocations } from "@/lib/data/locations";

const Nav = async () => {
  const locations = await fetchAllLocations();
  return <NavTemplate locations={locations} />;
};
export default Nav;
