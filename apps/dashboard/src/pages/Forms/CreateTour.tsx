import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import PageMeta from "../../components/common/PageMeta";
import DetailsInputs from "../../components/form/create-tour/DetailsInputs";
import TourInfoInputs from "../../components/form/create-tour/TourInfoInputs";
import TagSelect from "../../components/form/create-tour/ShortDescription";
import Editor from "../../components/form/create-tour/RichText";
import { useRef, useState } from "react";
import Quill from "quill";
import ComponentCard from "../../components/common/ComponentCard";
import { FormData } from "../../types/globals";
import TourSummary from "../../components/form/create-tour/TourSummary";
import Button from "../../components/ui/button/Button";
import { createTour, uploadImages } from "../../utils/api";
import Alert from "../../components/ui/alert/Alert";

export default function CreateTour() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title) {
      newErrors.title = "Title is required.";
    }

    if (!formData.location) {
      newErrors.location = "Location is required.";
    }

    if (!formData.duration) {
      newErrors.duration = "Duration is required.";
    }

    if (!formData.price || isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a valid number.";
    }

    if (formData.tags.length === 0) {
      newErrors.tags = "At least one tag is required.";
    }

    if (Object.keys(formData.tourDetails).length === 0) {
      newErrors.tourDetails = "Tour details are required.";
    }
    if (!formData.shortDescription) {
      newErrors.shortDescription = "Short description is required.";
    }
    if (!formData.description) {
      newErrors.description = "Description is required.";
    }
    if (files.length === 0) {
      newErrors.images = "At least one image is required.";
    }

    return newErrors;
  };

  const [alert, setAlert] = useState<{
    show: boolean;
    variant: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
  }>({
    show: false,
    variant: "success",
    title: "",
    message: "",
  });
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    location: "",
    duration: "",
    label: "",
    tags: [],
    images: [],
    tourDetails: {},
    price: "",
    shortDescription: "",
    description: "",
  });
  const quillRef = useRef<Quill | null>(null);
  const handleTextChange = () => {
    if (quillRef.current) {
      const editorHtml = quillRef.current.root.innerHTML;
      setFormData((prev) => ({
        ...prev,
        description: editorHtml,
      }));
    }
  };
  const updateTourDetails = (newTourDetails: Record<string, string[]>) => {
    setFormData((prev) => ({
      ...prev,
      tourDetails: newTourDetails,
    }));
  };
  const handleFilesChange = (newFiles: { file: File; preview: string }[]) => {
    setFiles(newFiles);
  };
  const submitTour = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    try {
      const uploadedImages = await uploadImages(files);
      if (!uploadedImages) {
        setAlert({
          show: true,
          variant: "error",
          title: "Error",
          message: "Image upload failed.",
        });
        setTimeout(() => {
          setAlert({
            show: false,
            variant: "error",
            title: "Error",
            message: "Failed to create tour.",
          });
        }, 2500);

        return;
      }

      const tourData = {
        ...formData,
        price: Number(formData.price),
        tourDetails: JSON.stringify(formData.tourDetails),
        images: uploadedImages.paths,
      };
      const tour = await createTour(tourData);

      if (tour) {
        setAlert({
          show: true,
          variant: "success",
          title: "Success",
          message: "Tour created successfully!",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setAlert({
          show: true,
          variant: "error",
          title: "Error",
          message: "Failed to create tour.",
        });
        setTimeout(() => {
          setAlert({
            show: false,
            variant: "error",
            title: "Error",
            message: "Failed to create tour.",
          });
        }, 2500);
      }
    } catch (error) {
      console.error("Error submitting tour:", error);
    }
  };
  return (
    <div className="relative">
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Create tour" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DetailsInputs
            errors={errors}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="space-y-6">
          <DropzoneComponent
            errors={errors}
            files={files}
            onFilesChange={handleFilesChange}
          />
          <TagSelect errors={errors} setFormData={setFormData} />
        </div>
      </div>
      <TourInfoInputs errors={errors} updateTourDetails={updateTourDetails} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-5">
        <ComponentCard title="Description">
          <Editor ref={quillRef} onTextChange={handleTextChange} />
          {errors.description && (
            <div className="text-sm text-error-500">{errors.description}</div>
          )}
        </ComponentCard>

        <ComponentCard title="Preview Description">
          {formData.description && (
            <div
              className="rich-text-output border p-4 rounded break-word overflow-hidden"
              dangerouslySetInnerHTML={{ __html: formData.description }}
            />
          )}
          {!formData.description && (
            <div className="border p-4 rounded">You will see preview here</div>
          )}
        </ComponentCard>
      </div>
      <ComponentCard className="mt-5" title="Tour Summary">
        <TourSummary files={files} formData={formData} />
        <Button size="md" variant="outline" onClick={submitTour}>
          Submit Tour
        </Button>
      </ComponentCard>
      {alert.show && (
        <div className="fixed top-20 right-10 z-50 w-[250px] mt-4">
          <Alert
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
            showLink={false}
          />
        </div>
      )}
    </div>
  );
}
