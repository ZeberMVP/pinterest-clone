import Dropzone from "@/components/Dropzone";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar activeTab="Create" />
      <main className="container">
        <h2 className="mx-auto text-center text-xl font-medium text-foreground">
          Create Pin
        </h2>
        <Dropzone />
      </main>
    </>
  );
}
