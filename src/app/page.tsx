import Navbar from "@/components/Navbar";
import PinList from "@/components/PinList";

export default function Home() {
  return (
    <>
      <Navbar activeTab="Home" />
      <PinList />
    </>
  );
}
