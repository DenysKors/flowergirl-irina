export const SortIcon = (isSorted: false | "asc" | "desc") => {
  if (isSorted === "asc")
    return (
      <>
        <svg
          className={`w-4 h-4 
            ${isSorted ? "fill-red-500" : "fill-gray-500"}`}
        >
          <use href="/icons.svg#icon-sort-asc"></use>
        </svg>
      </>
    );
  if (isSorted === "desc")
    return (
      <>
        <svg
          className={`w-4 h-4 
            ${isSorted ? "fill-red-500" : "fill-gray-500"}`}
        >
          <use href="/icons.svg#icon-sort-desc"></use>
        </svg>
      </>
    );
  return (
    <>
      <svg className="w-4 h-4 fill-gray-500">
        <use href="/icons.svg#icon-sort-unsorted"></use>
      </svg>
    </>
  );
};
