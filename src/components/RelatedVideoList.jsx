import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRelatedVideos } from '../features/relatedVideos/relatedVideosSlice';
import RelatedVideoListItem from './RelatedVideoListItem';
import Loading from "../components/Loading";

const RelatedVideoList = ({currentVideoId, tags}) => {
  const dispatch = useDispatch();
  const {relatedVideos, isLoading, isError, error} = useSelector((state)=> state.relatedVideos);

  useEffect(()=> {
    dispatch(fetchRelatedVideos({tags, id: currentVideoId}));
  }, [dispatch, tags, currentVideoId]);

  //decide what to render
  let content = null;
  if(isLoading) content = <Loading loadingText="Related videos are loading..." />

  if(!isLoading && isError) content = <div className="col-span-12">{error}</div>;

  if(!isLoading && !isError && relatedVideos?.length === 0){
    content = <div className="col-span-12">No related videos found!</div>;
  }

  if(!isLoading && !isError && relatedVideos?.length > 0){
    content = relatedVideos.map((relatedVideo)=> (
      <RelatedVideoListItem key={relatedVideo.id} relatedVideo={relatedVideo} />
    ))
  }

  return (
    <div
    className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto"
>
    {content}
</div>
  )
}

export default RelatedVideoList