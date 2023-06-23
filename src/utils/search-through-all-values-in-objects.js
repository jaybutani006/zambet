//filter start
let filteredDataSource = [];
let search = "";

const trimString = (s) => {
  let l = 0,
    r = s.length - 1;
  while (l < s.length && s[l] == " ") l++;
  while (r > l && s[r] == " ") r -= 1;
  return s.substring(l, r + 1);
};

const compareObjects = (o1, o2) => {
  let k = "";
  for (k in o1) if (o1[k] != o2[k]) return false;
  for (k in o2) if (o1[k] != o2[k]) return false;
  return true;
};

const itemExists = (haystack, needle) => {
  for (let i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
  return false;
};

const searchFor = (toSearch, objects) => {
  let results = [];
  search = toSearch + "";

  if (toSearch) {
    toSearch = trimString(toSearch).toLowerCase(); // trim it
    for (let i = 0; i < objects.length; i++) {
      for (let key in objects[i]) {
        if (typeof objects[i][key] === "string" && objects[i][key].toLowerCase().indexOf(toSearch) != -1) {
          if (!itemExists(results, objects[i])) results.push(objects[i]);
        }
      }
    }

    filteredDataSource = [...results];
    return filteredDataSource;
  } else {
    filteredDataSource = [...objects];
    return filteredDataSource;
  }
};
//filter end

export { searchFor };
