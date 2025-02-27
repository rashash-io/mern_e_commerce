export const shrinkName = (itemName, length) => {
  var name = itemName;
  if (name.length > length) {
    name = itemName.slice(0, length) + "...";
  }
  return name;
};
