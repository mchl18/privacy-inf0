"use client";

import Link from "next/link";
import { usePrivacyConfigs, useDownloadConfig } from "@/hooks/usePrivacyConfig";

export default function Configurations() {
  const { data: files, isLoading, error } = usePrivacyConfigs();
  const downloadConfig = useDownloadConfig();

  const handleDownload = (filename: string) => {
    downloadConfig.mutate(filename);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Privacy Configurations
          </h1>
          <div className="flex gap-4">
            <Link
              href="/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              New Configuration
            </Link>
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {(error || downloadConfig.error) && (
          <div className="p-4 mb-6 rounded-md bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300">
            {error instanceof Error
              ? error.message
              : downloadConfig.error?.message || "An error occurred"}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              Loading configurations...
            </div>
          ) : !files?.length ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No configurations found.{" "}
              <Link
                href="/new"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Create one
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {files.map((file) => (
                <li
                  key={file.name}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                        {file.name}
                      </h2>
                      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Size: {Math.round(file.size / 1024)} KB • Modified:{" "}
                        {new Date(file.modified).toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(file.name)}
                      disabled={downloadConfig.isPending}
                      className="ml-4 px-4 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-md hover:bg-green-200 dark:text-green-300 dark:bg-green-900 dark:hover:bg-green-800 disabled:opacity-50"
                    >
                      {downloadConfig.isPending ? "Downloading..." : "Download"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
