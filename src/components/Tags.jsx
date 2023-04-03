import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../features/tags/tagsSlice";
import Loading from "./Loading";
import Tag from "./Tag";

const Tags = () => {
  const dispatch = useDispatch();
  const { tags, isLoading, isError, error } = useSelector(
    (state) => state.tags
  );

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  let content;
  if (isLoading) content = <Loading loadingText="Tags are loading..." />;

  if (!isLoading && isError)
    content = <div className="col-span-12">{error}</div>;

  if (!isLoading && !isError && tags?.length === 0) {
    content = <div className="col-span-12">No tags found!</div>;
  }
  if (!isLoading && !isError && tags?.length > 0) {
    content = tags.map((tag) => <Tag key={tag.id} tag={tag} />);
  }
  return (
    <section>
      <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto">
        {content}
      </div>
    </section>
  );
};

export default Tags;
