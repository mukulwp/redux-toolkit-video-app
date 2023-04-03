import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../features/videos/videosSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector(
    (state) => state.videos
  );
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };
  return (
    <section className="pt-12">
      <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end">
        {/* <div className="bg-blue-600 text-white px-4 py-1 rounded-full">1</div>
        <div className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full">2</div>
        <div className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full">3</div>
        <div className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full">4</div> */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
            className={currentPage === page ? "bg-blue-600 text-white px-4 py-1 rounded-full" : "bg-blue-100 text-red-500 px-4 py-1 rounded-full"}
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          )
        )}
      </div>
    </section>
  );
};

export default Pagination;
