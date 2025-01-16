"use client";

import { useState } from "react";
import Link from "next/link";
import { PRIVACY_API_TYPES } from "@/types/privacy";

export default function NewConfig() {
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [configName, setConfigName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTypeToggle = (typeId: string) => {
    const newSelected = new Set(selectedTypes);
    if (newSelected.has(typeId)) {
      newSelected.delete(typeId);
    } else {
      newSelected.add(typeId);
    }
    setSelectedTypes(newSelected);
  };

  const handleSubmit = async () => {
    try {
      if (!configName) {
        setError("Please provide a configuration name");
        return;
      }

      const content = {
        NSPrivacyAccessedAPITypes: Array.from(selectedTypes),
      };

      const response = await fetch("/api/privacy-files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: `${configName}.json`,
          content,
        }),
      });

      if (!response.ok) throw new Error("Failed to save configuration");

      setSuccess("Configuration saved successfully!");
      setError("");
      setConfigName("");
      setSelectedTypes(new Set());
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to save configuration");
      }
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            New Privacy Configuration
          </h1>
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

        {(error || success) && (
          <div
            className={`p-4 mb-6 rounded-md ${
              error
                ? "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                : "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
            }`}
          >
            {error || success}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
          <div className="mb-6">
            <label
              htmlFor="configName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Configuration Name
            </label>
            <input
              type="text"
              id="configName"
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="my-app-privacy-config"
            />
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Select Privacy API Types
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PRIVACY_API_TYPES.map((type) => (
                <div
                  key={type.id}
                  className="relative flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="min-w-0 flex-1">
                    <label className="font-medium text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={selectedTypes.has(type.id)}
                        onChange={() => handleTypeToggle(type.id)}
                        className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      {type.name}
                    </label>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {type.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
