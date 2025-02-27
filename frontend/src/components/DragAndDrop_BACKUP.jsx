import { CircleX, CloudUpload, FileCheck, FolderOpen, ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { shrinkName } from "../utils";


const supportedFiles = [".png", ".jpg", ".webp", ".jpeg"];

export const DragAndDrop = ({ onFilesSelected }) => {
  const [files, setFiles] = useState([]);
  const [drag, setDrag] = useState(false);

 function isValidFileType(file) {
   const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
   let res =allowedTypes.includes(file.type);
   
   return res
 }

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0 ) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  const handleDrop = async (event) => {
    event.preventDefault();
    setDrag(false);
    const droppedFiles = event.dataTransfer.files;
   const base64 = await getBase64(droppedFiles[0]);
   
    if ((droppedFiles.length > 0) &&( isValidFileType(droppedFiles[0]))) {
      console.log("passedf")
      const newFiles = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }else{

      console.log("Invalid file or invalid file type")
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  function getBase64(file) {
    var fileReader = new FileReader();
    if (file) {
      fileReader.readAsDataURL(file);
    }
    return new Promise((resolve, reject) => {
      fileReader.onload = function (event) {
        resolve(event.target.result);
      };
    });
  }

  useEffect(() => {
    onFilesSelected(files);
  }, [files, onFilesSelected]);

  return (
    <>
      <button className="btn">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-ghost">Ghost</button>
      <button className="btn btn-link"onClick={()=>console.log(files)}>Link</button>

      <div
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        onDragEnter={(event) => {
          event.preventDefault();
          setDrag(true);
        }}
        onDragExit={(event) => {
          event.preventDefault();
          setDrag(false);
        }}
        // style={{ width: width, height: height }}
        className={`${
          files.length > 0 ? "border-emerald-500" : "border-sky-500"
        } ${drag ? "bg-emerald-700" : "bg-gray-950/50"}
           cursor-pointer  p-3 flex justify-center items-center gap-2  border-2 h-fit rounded-xl w-full `}
      >
        <>
          <input
            type="file"
            hidden
            id="browseFiles"
            onChange={handleFileChange}
            accept={supportedFiles.join(",")}
            multiple
          />
          
        </>
        <div className="flex flex-col gap-2 items-center">
          <div className="flex items-center justify-center gap-3">
            
            <CloudUpload />

            <div className="flex flex-col">
              <span className="font-semibold">
                Drag & drop your images here
              </span>
              <div className="flex gap-2 text-xs italic">
                <span>Supported files:</span>
                {supportedFiles.map((fileExt, index) => (
                  <span className="flex flex-row" key={index}>
                    {"'"}
                    {fileExt} {"'"}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ------ File Names ------ */}
          {files.length > 0 && !drag && (
            <div className="file-list w-full">
              <div className="file-list__container">
                {files.map((file, index) => (
                  <div
                    className="file-item flex gap-2 align-center justify-between p-2 border border-gray-800 rounded-2xl m-2"
                    key={index}
                  >
                 
                      <p className="text-gray-300">{shrinkName(file.name, 25)}</p>
                      {/* <p className="text-gray-500 text-sm">
                        <span className="font-semibold">Type:</span> {file.type}
                      </p> */}
                    <div className=" place-self-center">
                      <CircleX
                        className="text-gray-500 hover:text-secondary transition-all duration-300"
                        onClick={() => handleRemoveFile(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Number of Files Footer */}
          {files.length > 0 && !drag && (
            <div className="success-file flex gap-2 items-center text-emeraald-500">
              <FileCheck className="text-emerald-500" />
              <p className="font-bold text-emerald-500">
                {files.length} file(s) selected
              </p>
            </div>
          )}

          {drag && <ImagePlus className="text-gray-400 h-16 w-16 my-10" />}

          {!drag && (
            <label
              className="btn btn-sm btn-primary flex items-center gap-2"
              htmlFor="browseFiles"
            >
              <FolderOpen className="h-6 w-6" />
              Browse files
            </label>
          )}
        </div>
      </div>
    </>
  );
};
export default DragAndDrop;
