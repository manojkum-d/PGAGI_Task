import React, { useState } from "react";

const KnowledgeBase: React.FC<{
  onStateChange: (urls: string[]) => void;
}> = ({ onStateChange }) => {
  const [urls, setUrls] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");

  const handleAddUrl = () => {
    if (urlInput) {
      const newUrls = [...urls, urlInput];
      setUrls(newUrls);
      setUrlInput("");
      onStateChange(newUrls);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg text-center shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Knowledge Base
      </h3>

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
            className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors"
            onClick={handleAddUrl}
          >
            Add URL
          </button>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h4 className="text-lg font-medium text-gray-800 mb-2">
          Knowledge Base Information
        </h4>
        <ul className="text-sm text-gray-600 list-disc list-inside">
          {urls.map((url, index) => (
            <li key={index}>{url}</li>
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
