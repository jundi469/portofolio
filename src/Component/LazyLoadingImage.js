import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function LazyLoadingImage({ src }) {
  return <LazyLoadImage alt="" src={src}></LazyLoadImage>;
}
