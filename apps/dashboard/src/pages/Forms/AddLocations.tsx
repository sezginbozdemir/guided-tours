import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
  createLocation,
  fetchAllLocations,
  uploadImages,
  deleteLocation,
} from "../../utils/api";
import { Location } from "../../types/globals";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import ComponentCard from "../../components/common/ComponentCard";
import Alert from "../../components/ui/alert/Alert";
import Button from "../../components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import ConfirmModal from "../../components/ui/modal/confirmModal";
import Checkbox from "../../components/form/input/Checkbox";
import Badge from "../../components/ui/badge/Badge";

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

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    popular: false,
  });
  console.log(formData);
  useEffect(() => {
    const loadLocations = async () => {
      const fetchedLocations = await fetchAllLocations();
      setLocations(fetchedLocations);
      setLoading(false);
    };

    loadLocations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(locations);

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
          setAlert({
            show: false,
            variant: "error",
            title: "Error",
            message: "Failed to create tour.",
          });
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
  const askDeleteLocation = (id: number) => {
    setSelectedLocationId(id);
    setConfirmOpen(true);
  };
  const handleDeleteLocation = async (id: number) => {
    if (selectedLocationId == null) return;
    const success = await deleteLocation(id);
    if (success) {
      setLocations(locations.filter((location) => location.id !== id));
      setAlert({
        show: true,
        variant: "success",
        title: "Deleted",
        message: "Location deleted successfully.",
      });
      setTimeout(() => setAlert({ ...alert, show: false }), 2000);
    } else {
      setAlert({
        show: true,
        variant: "error",
        title: "Error",
        message: "Failed to delete location.",
      });
      setTimeout(() => setAlert({ ...alert, show: false }), 2000);
    }
    setConfirmOpen(false);
  };
  return (
    <div className="relative">
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() =>
          selectedLocationId && handleDeleteLocation(selectedLocationId)
        }
        message="This will permanently delete the location."
      />
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

          <Button size="md" variant="outline" onClick={submitLocation}>
            Submit
          </Button>
        </ComponentCard>
        <div>
          <DropzoneComponent
            onFilesChange={handleFilesChange}
            files={files}
            errors={errors}
          />
        </div>
      </div>
      <ComponentCard className="mt-5" title="Locations">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Nr.
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Description
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Images
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {locations.map((location, index) => (
                  <TableRow key={location.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="w-10 h-10">{index + 1}</div>
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="font-medium text-gray-800 dark:text-white/90 capitalize">
                        {location.name}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {location.description}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex -space-x-2">
                        {location.images.slice(0, 3).map((img, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                          >
                            <img
                              width={24}
                              height={24}
                              src={`${import.meta.env.VITE_API_URL}${img}`}
                              className="w-full size-6"
                            />
                          </div>
                        ))}
                        {location.images.length > 3 && (
                          <div className="w-6 h-6 flex justify-center items-center overflow-hidden">
                            <span className="text-xs text-gray-500">
                              +{location.images.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      {location.popular && (
                        <Badge variant="light" color="primary">
                          Popular
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <button
                        onClick={() => askDeleteLocation(location.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Remove
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}
