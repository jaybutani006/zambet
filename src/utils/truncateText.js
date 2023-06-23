// source is String & size is Number
export const truncate = (source, size) => {
  if (!source) {
    return "";
  }
  return source.length > size ? source.slice(0, size - 1) + "…" : source;
};
