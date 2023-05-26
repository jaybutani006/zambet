export const getLocationPathNameLastSplit = (source) => {
  // location.pathname -> source
  //   return source.split("/").slice(0, -1).join("/") + "/newPath";
  return source.split("/").slice(0, -1);

  // location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
};
