import { useEffect, useState } from "react";
import { Location } from "../../../types/globals";
import Alert from "../../ui/alert/Alert";
import Badge from "../../ui/badge/Badge";
import ConfirmModal from "../../ui/modal/confirmModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  deleteImage,
  deleteLocation,
  fetchAllLocations,
} from "../../../utils/api";

export default function BasicTableTwo() {
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
  const [loading, setLoading] = useState<boolean>(true);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null
  );
  const [locations, setLocations] = useState<Location[]>([]);
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

  const askDeleteLocation = (id: number) => {
    setSelectedLocationId(id);
    setConfirmOpen(true);
  };
  const handleDeleteLocation = async (id: number) => {
    if (selectedLocationId == null) return;
    const locationToDelete = locations.find((location) => location.id === id);
    if (!locationToDelete) return;

    if (locationToDelete.images && locationToDelete.images.length > 0) {
      await Promise.all(
        locationToDelete.images.map((imgPath) => deleteImage(imgPath))
      );
    }
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
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
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
  );
}
