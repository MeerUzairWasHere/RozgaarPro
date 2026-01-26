import { SearchBar, ProfessionsFilter, NearbyWorkers } from "@/components";
import { router } from "expo-router";

const UserHomeScreen = () => {

  return (
    <>
      <SearchBar />
      <ProfessionsFilter />
      <NearbyWorkers />
    </>
  );
};
export default UserHomeScreen;
