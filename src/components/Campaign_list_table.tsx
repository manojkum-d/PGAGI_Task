"use client";
import React from "react";
import { useCampaigns } from "../hooks/useGetCampaign";
import { Pagination, Spinner, Button } from "@nextui-org/react";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { EyeIcon } from "./icons/EyeIcon";
import { CallIcon } from "./icons/CallIcon"; // Import your CallIcon component
import { PlusIcon } from "./icons/icons"; // Import PlusIcon component
import Link from "next/link";

export default function CampaignTable() {
  const { campaigns, isLoading, isError } = useCampaigns();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  if (isLoading)
    return (
      <div className="">
        <Spinner label="Loading..." color="default" />
      </div>
    );
  if (isError)
    return <div className="text-red-500">Error loading campaigns</div>;

  // Calculate pagination
  const totalPages = Math.ceil(campaigns.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = campaigns.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Campaign List</h1>
        <Link href="/campaign/add-campaign">
          <Button
            className="bg-blue-500 text-white"
            endContent={<PlusIcon />}
            size="sm"
          >
            Add New
          </Button>
        </Link>
      </div>
      {currentItems.length === 0 ? (
        <div>No campaigns found</div>
      ) : (
        <div>
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b px-4 py-2 text-left">Title</th>
                <th className="border-b px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="border-b px-4 py-2">
                    {campaign.title || "Untitled Campaign"}
                  </td>
                  <td className="border-b px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="View"
                      >
                        <EyeIcon />
                      </button>
                      <button
                        className="text-yellow-500 hover:text-yellow-700"
                        aria-label="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete"
                      >
                        <DeleteIcon />
                      </button>
                      <button
                        className="text-green-500 hover:text-green-700"
                        aria-label="Call"
                      >
                        <Link href="/campaign/add-call">
                          <CallIcon />
                        </Link>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <Pagination
              loop
              showControls
              color="primary"
              total={totalPages}
              initialPage={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
