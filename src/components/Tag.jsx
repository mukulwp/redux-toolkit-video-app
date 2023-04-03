import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tagRemoved, tagSelected } from "../features/filter/filterSlice";

const Tag = ({tag={}}) => {

  const dispatch = useDispatch();
  const {tags: selectedTags} = useSelector((state)=> state.filter);
  const isSelected = selectedTags.includes(tag.title) ? true : false;

  const handleSelect = () => {
    if(isSelected){
      dispatch(tagRemoved(tag.title));
    }else{
      dispatch(tagSelected(tag.title))
    }
  }
  return (
      <div className={` px-4 py-1 rounded-full cursor-pointer ${isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'}`} onClick={handleSelect}>
        {tag.title}
      </div>

  );
};

export default Tag;
