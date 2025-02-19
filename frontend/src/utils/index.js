export const shrinkName = (product, length) => {
  var name = product.name;
  if (name.length > length) {
    name = product.name.slice(0, length) + "...";
  }
  return name;
};
