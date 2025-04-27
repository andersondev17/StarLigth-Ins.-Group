'use client';
import Home from "@/components/Layout/Home";
import dynamic from "next/dynamic";

const Whyus = dynamic(() => import('@/components/Whyus'), {
  loading: () => <div className="h-96 flex-center">Loading...</div>,
  ssr: false
});
const page = () => {
  return (

    <main>
      {/* Value Proposition Section */}
      <Home />

      {/* Why Starlight Section */}
      <Whyus />

    </main>

  );
};

export default page