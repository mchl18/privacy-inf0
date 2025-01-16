import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Apple Privacy Configuration
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Generate and manage privacy declarations for your iOS applications
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Start Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quick Start</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Create a new privacy configuration in minutes
              </p>
              <a
                href="/new"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Create New Config
              </a>
            </div>
          </div>

          {/* Documentation Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Documentation</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Learn about privacy requirements and best practices
              </p>
              <a
                href="https://developer.apple.com/documentation/bundleresources/privacy_manifest_keys/nsapplicationaccessedapitype"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-600 bg-purple-100 hover:bg-purple-200 dark:text-purple-300 dark:bg-purple-900 dark:hover:bg-purple-800"
              >
                View Docs
              </a>
            </div>
          </div>

          {/* Manage Configs Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Manage Configs</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                View and manage your saved configurations
              </p>
              <a
                href="/configurations"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-600 bg-green-100 hover:bg-green-200 dark:text-green-300 dark:bg-green-900 dark:hover:bg-green-800"
              >
                View Configs
              </a>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Next.js
            </a>
            {" "}and{" "}
            <a
              href="https://hono.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Hono
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
