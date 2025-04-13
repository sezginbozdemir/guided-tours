import { FormData } from "../../../types/globals";

interface Props {
  formData: FormData;
  files: {
    file: File;
    preview: string;
  }[];
}

export default function TourSummary({ formData, files }: Props) {
  return (
    <div className="space-y-6 flex-row flex items-start justify-between">
      <div className="w-full">
        {/* Tour Title */}
        {formData.title && (
          <div className="flex items-center space-x-2">
            <span className="text-base font-medium text-gray-800 dark:text-white/90">
              Tour Title:
            </span>
            <span className="text-gray-700 text-sm my-3">{formData.title}</span>
          </div>
        )}

        {/* Location */}
        {formData.location && (
          <div className="flex items-center space-x-2">
            <span className="text-base font-medium text-gray-800 dark:text-white/90">
              Location:
            </span>
            <span className="text-gray-700 text-sm my-3">
              {formData.location}
            </span>
          </div>
        )}

        {/* Duration */}
        {formData.duration && (
          <div className="flex items-center space-x-2">
            <span className="text-base font-medium text-gray-800 dark:text-white/90">
              Duration:
            </span>
            <span className="text-gray-700 text-sm my-3">
              {formData.duration}
            </span>
          </div>
        )}

        {/* Price */}
        {formData.price && (
          <div className="flex items-center space-x-2">
            <span className="text-base font-medium text-gray-800 dark:text-white/90">
              Price:
            </span>
            <span className="text-gray-700 text-sm my-3">{formData.price}</span>
          </div>
        )}
        {/* Label */}
        {formData.label && (
          <div className="flex items-center space-x-2">
            <span className="text-base font-medium text-gray-800 dark:text-white/90">
              Label:
            </span>
            <span className="text-gray-700 text-sm my-3">{formData.label}</span>
          </div>
        )}

        {/* Tags */}
        {formData.tags.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-base font-medium text-gray-800 dark:text-white/90">
              Tags:
            </span>
            <span className="text-gray-700 text-sm my-3">
              {formData.tags.join(", ")}
            </span>
          </div>
        )}
        {/* Image Previews */}
        {files.length > 0 && (
          <div>
            <h4 className="text-md font-semibold">Image Previews</h4>
            <div className="grid grid-cols-7 gap-4 mt-2">
              {files.slice(0, 5).map((file, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={file.preview}
                    alt={`Image ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
              {files.length > 5 && (
                <div className="w-20 h-20 flex justify-center items-center overflow-hidden">
                  <span className="text-xl text-gray-500">
                    +{files.length - 5}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="w-full">
        {/* Short Description */}
        {formData.shortDescription && (
          <div className="flex items-center space-x-2">
            <span className="text-base font-medium text-gray-800 dark:text-white/90">
              Short Description:
            </span>
            <span className="text-gray-700 text-sm my-3">
              {formData.shortDescription}
            </span>
          </div>
        )}

        {/* Tour Details */}
        {Object.keys(formData.tourDetails).length > 0 && (
          <div>
            <h4 className="text-md font-semibold">Tour Details</h4>
            <div>
              {Object.entries(formData.tourDetails).map(
                ([key, value], index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-base font-medium text-gray-800 dark:text-white/90">
                      {key}:
                    </span>
                    <span className="text-gray-700 text-sm my-3">
                      {value.join(", ")}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Tour Description */}
        {formData.description && (
          <div className="mt-3">
            <h4 className="text-md font-semibold">Tour Description</h4>
            <div
              className="rich-text-output border p-4 rounded break-words  max-h-[200px]"
              dangerouslySetInnerHTML={{
                __html: formData.description.slice(0, 200) + "...",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
