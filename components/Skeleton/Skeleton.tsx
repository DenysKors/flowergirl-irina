export default function Skeleton({ slotsAmount = 2 }) {
  return (
    <div
      // className="flex flex-wrap gap-3 justify-start"
      className="mx-auto pt-4 pb-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4 md:gap-8 justify-items-center"
    >
      {[...Array(slotsAmount)].map((_, idx) => {
        return (
          <div key={idx} className="animate-pulse place-self-stretch">
            <div className="h-53.5 md:h-95 lg:h-111.25 grid place-items-center bg-gray-300 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-12 w-12 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                ></path>
              </svg>
            </div>

            <div>
              <div className="font-text antialiased text-base text-inherit mb-4 mt-4 h-3  rounded-full bg-gray-300"></div>

              <div className="font-text antialiased text-base text-inherit mb-2 h-3 w-1/3 rounded-full bg-gray-300"></div>

              <div className="font-text antialiased text-base text-inherit mb-2 h-2 w-1/2 rounded-full bg-gray-300"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
