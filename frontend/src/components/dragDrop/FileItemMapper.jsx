import { CircleX } from "lucide-react";
import { shrinkName } from "../../utils";

export const FileItemMapper = (files, drag, handleRemoveFile) => {
  return (
    <>
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
    </>
  );
};

export default FileItemMapper;
