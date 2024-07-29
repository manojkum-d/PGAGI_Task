// pages/index.tsx

import Link from "next/link";
import { Button } from "@nextui-org/react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Welcome to Toingg
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        Explore our features and get started with managing your campaigns.
      </p>
      <Link href="/campaign" passHref>
        <Button color="primary">Go to Campaign</Button>
      </Link>
    </div>
  );
};

export default Home;
