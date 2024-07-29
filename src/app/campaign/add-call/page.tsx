"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Spinner } from "@nextui-org/react";

export default function MakeCall() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [campID, setCampID] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phoneNumber", phoneNumber);
      formData.append("campID", campID);
      if (csvFile) formData.append("csvFile", csvFile);

      const response = await axios.post(
        "https://www.toingg.com/api/v3/make_call",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
            Authorization:
              "Bearer tg_ffb857af-4859-4a1d-a448-d8d596dc2c4e-5_Tzr7gjSXoaAUBLFiRqKg",
          },
        }
      );
      setResponseMessage("Call initiated successfully");
    } catch (error: any) {
      setResponseMessage(
        `Error: ${error.response?.data?.detail || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg text-center shadow-md w-[60vw] ml-80 mt-36">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Make a Call</h3>

      <div className="mb-6">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
        />
        <Input
          label="Phone Number"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mb-4"
        />
        <Input
          label="Campaign ID"
          value={campID}
          onChange={(e) => setCampID(e.target.value)}
          className="mb-4"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="csv-file"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Upload CSV with contact info (Name and Phone Number)
        </label>
        <div className="border-2 border-dashed border-gray-300 p-8 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="mt-1 text-sm text-gray-600">
            Drag and drop a file here or click to select file
          </p>
          <input
            type="file"
            id="csv-file"
            className="hidden"
            accept=".csv"
            onChange={(e) =>
              setCsvFile(e.target.files ? e.target.files[0] : null)
            }
          />
          <button
            type="button"
            onClick={() => document.getElementById("csv-file")?.click()}
            className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Choose File
          </button>
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={loading} className="mt-4">
        {loading ? <Spinner color="default" /> : "Make Call"}
      </Button>

      {responseMessage && (
        <p className="mt-4 text-sm text-gray-600">{responseMessage}</p>
      )}
    </div>
  );
}
