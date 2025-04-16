import { useEffect, useRef, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
  createLocation,
  fetchAllLocations,
  uploadImages,
} from "../../utils/api";
import { Location } from "../../types/globals";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import ComponentCard from "../../components/common/ComponentCard";
import Alert from "../../components/ui/alert/Alert";
import Button from "../../components/ui/button/Button";
import Checkbox from "../../components/form/input/Checkbox";
import Quill from "quill";
import Editor from "../../components/form/create-tour/RichText";

export default function AddLocations() {
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [locations, setLocations] = useState<Location[]>([]);
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    about: "",
    images: [],
    popular: false,
  });
  useEffect(() => {
    const loadLocations = async () => {
      const fetchedLocations = await fetchAllLocations();
      setLocations(fetchedLocations);
    };

    loadLocations();
  }, []);

  const handleFilesChange = (newFiles: { file: File; preview: string }[]) => {
    setFiles(newFiles);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleTextAreaChange = (value: string) => {
    setFormData({
      ...formData,
      description: value,
    });
  };
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Title is required.";
    if (!formData.about) newErrors.about = "About field is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (files.length === 0)
      newErrors.images = "At least one image is required.";
    return newErrors;
  };
  const submitLocation = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    const existingLocation = locations.find(
      (location) => location.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (existingLocation) {
      setAlert({
        show: true,
        variant: "error",
        title: "Error",
        message: `A location with the name "${formData.name}" already exists.`,
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
          setAlert({ ...alert, show: false });
        }, 2500);

        return;
      }

      const locationData = {
        ...formData,
        images: uploadedImages.paths,
      };

      const location = await createLocation(locationData);

      if (location) {
        setAlert({
          show: true,
          variant: "success",
          title: "Success",
          message: "Location created successfully!",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setAlert({
          show: true,
          variant: "error",
          title: "Error",
          message: "Failed to create location.",
        });
        setTimeout(() => {
          setAlert({ ...alert, show: false });
        }, 2500);
      }
    } catch (error) {
      console.error("Error submitting location:", error);
    }
  };

  const quillRef = useRef<Quill | null>(null);
  const handleTextChange = () => {
    if (quillRef.current) {
      const editorHtml = quillRef.current.root.innerHTML;
      setFormData((prev) => ({
        ...prev,
        about: editorHtml,
      }));
    }
  };

  return (
    <div className="relative">
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

      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Add locations" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ComponentCard title="Location details">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              error={errors.name ? true : false}
              hint={errors.name ? errors.name : ""}
              type="text"
              id="name"
              placeholder="Location name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Description</Label>
            <TextArea
              error={errors.description ? true : false}
              hint={errors.description ? errors.description : ""}
              placeholder="Description"
              value={formData.description}
              onChange={handleTextAreaChange}
              rows={3}
            />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={formData.popular}
              onChange={(checked) =>
                setFormData((prev) => ({ ...prev, popular: checked }))
              }
              label="Popular"
            />
          </div>
        </ComponentCard>
        <div>
          <DropzoneComponent
            onFilesChange={handleFilesChange}
            files={files}
            errors={errors}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-5">
        <ComponentCard title="Description">
          <Editor ref={quillRef} onTextChange={handleTextChange} />
          {errors.about && (
            <div className="text-sm text-error-500">{errors.about}</div>
          )}
        </ComponentCard>

        <ComponentCard title="Preview Description">
          {formData.about && (
            <div
              className="rich-text-output border p-4 rounded break-word overflow-hidden"
              dangerouslySetInnerHTML={{ __html: formData.about }}
            />
          )}
          {!formData.about && (
            <div className="border p-4 rounded">You will see preview here</div>
          )}
          <Button size="md" variant="outline" onClick={submitLocation}>
            Submit
          </Button>
        </ComponentCard>
      </div>
    </div>
  );
}
