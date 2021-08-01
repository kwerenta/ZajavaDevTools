import Link from "next/link";
import React, { ReactElement } from "react";
import { useAuth } from "../contexts/AuthContext";

interface Props {}

export default function Navigation({}: Props): ReactElement {
  const auth = useAuth();
  return (
    <nav className="sticky max-h-screen top-0 z-30 flex items-center lg:flex-col lg:rounded-r-2xl bg-zajavaBlue-800">
      <Link href="/">
        <a>
          <div
            className="flex items-center justify-center rounded-r-2xl w-20 h-20 lg:w-24 lg:h-24 bg-zajavaBlue-500 relative overflow-y-hidden 
      after:absolute after:right-0 after:top-1/2 after:w-full after:h-full after:rounded-l-2xl after:bg-zajavaBlue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 z-40 text-zajavaBlue-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
        </a>
      </Link>
      <div className="ml-auto lg:mt-auto mr-4 lg:mx-0 lg:mb-4">
        <button
          disabled={auth.isLoading}
          onClick={() => {
            auth.currentUser ? auth.logout() : auth.loginWithGoogle();
          }}
          className={`w-14 h-14 rounded-full pt-4 ${
            auth.currentUser ? "bg-zajavaBlue-500" : "bg-red-900"
          }`}
        ></button>
      </div>
    </nav>
  );
}
