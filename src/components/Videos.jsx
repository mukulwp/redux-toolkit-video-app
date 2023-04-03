import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVideos, fetchVideos } from "../features/videos/videosSlice";
import Loading from "./Loading";
import VideoCard from "./VideoCard";

const Videos = () => {
  const dispatch = useDispatch();
  const { videos, isLoading, isError, error, currentPage } = useSelector(
    (state) => state.videos
  );
  const {tags, searchText} = useSelector((state)=> state.filter);

  useEffect(() => {
    dispatch(fetchVideos({currentPage, tags, searchText}));
  }, [dispatch, tags, searchText, currentPage]);
  
  useEffect(() => {
    dispatch(fetchAllVideos());
  }, [dispatch]);
  //decide what to render
  let content;
  if (isLoading) content = <Loading loadingText="Videos are loading..." />;
  if (!isLoading && isError)
    content = <div className="col-span-12">{error}</div>;

    if(!isLoading && !isError && videos?.length === 0){
      content = <div className="col-span-12">No videos found!</div>;
    }

    if(!isLoading && !isError && videos?.length > 0){
      content = videos.map((video)=> (
          <VideoCard key={video.id} video={video} />
      ))
    }

  return (
    <section className="pt-12">
      <section className="pt-12">
        <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
          {content}
        </div>
      </section>
    </section>
  );
};

export default Videos;
