//------------------- CONSTANTS -------------------//
export const supportedFiles = [".png", ".jpg", ".webp", ".jpeg"];
export const allowedTypes = ["image/jpeg", "image/png", "image/webp"];


//------------------- FUNCTIONS -------------------//
export function isValidFileType(file) {
  let res = allowedTypes.includes(file.type);

  return res;
}

export function getBase64(file) {
  var fileReader = new FileReader();
  if (file) {
    fileReader.readAsDataURL(file);
  }
  return new Promise((resolve, reject) => {
    fileReader.onload = function (event) {
      resolve(event.target.result);
      reject((reason) => {
        console.log("BASE64 Reject reaseon is: ", reason);
      });
    };
  });
}
