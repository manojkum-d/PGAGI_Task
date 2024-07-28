import React, { useState } from "react";

const KnowledgeBase: React.FC = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");

  const handleAddUrl = () => {
    if (urlInput) {
      setUrls([...urls, urlInput]);
      setUrlInput("");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files ?? []);
    setFiles([...files, ...uploadedFiles]);
  };

  return (
    <div className="bg-white p-6 rounded-lg text-center shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Knowledge Base
      </h3>

      {/* URL Input */}
      <div className="mb-6">
        <label
          htmlFor="kb-url"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter URL
        </label>
        <div className="flex">
          <input
            type="url"
            id="kb-url"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/document"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors"
            onClick={handleAddUrl}
          >
            Add URL
          </button>
        </div>
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label
          htmlFor="kb-file"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Upload File (PDF, DOC, EXCEL, etc.)
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
            id="kb-file"
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={handleFileUpload}
          />
          <button
            type="button"
            onClick={() => document.getElementById("kb-file")?.click()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Choose File
          </button>
        </div>
      </div>

      {/* Knowledge Base Information */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h4 className="text-lg font-medium text-gray-800 mb-2">
          Knowledge Base Information
        </h4>
        <ul className="text-sm text-gray-600 list-disc list-inside">
          {urls.map((url, index) => (
            <li key={index}>{url}</li>
          ))}
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        Your knowledge base helps assistants provide more informed and
        contextual responses.
      </p>
    </div>
  );
};

export default KnowledgeBase;
