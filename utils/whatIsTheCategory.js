import categories from "../categories.json";

const whatIsTheCategory = (num) => {
  let str = "";
  for (let i = 0; i < categories.genres.length; i++) {
    if (num === categories.genres[i].id) {
      str = categories.genres[i].name;
    }
  }
  return str;
};
export default whatIsTheCategory;
