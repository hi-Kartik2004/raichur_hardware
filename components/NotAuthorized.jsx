import React from "react";

function NotAuthorized() {
  return (
    <div className="min-h-screen flex justify-center items-center px-2">
      <div className="max-w-[720px]">
        <h3 className="text-center text-3xl font-semibold">
          You're{" "}
          <span className="underline underline-offset-8 text-red-500">
            not Authorized
          </span>{" "}
          to view this page!
        </h3>

        <p className="mt-4 text-center">
          The chances are that you're viewing a page without being logged in
          with the appropriate email address or this page has moved to another
          end point.
        </p>
      </div>
    </div>
  );
}

export default NotAuthorized;
