import Campaign_table from "@/components/Campaign_table";
import React from "react";

export default function page() {
  return (
    <div className="container mx-auto p-4 max-w-[45%] mt-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Campaigns
      </h1>
      <p className="text-xl text-muted-foreground my-4">
        This page is for managing your campaigns. You can create, modify, view,
        and update your campaign here.
      </p>
      <Campaign_table />
    </div>
  );
}
