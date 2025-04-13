import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { Tour } from "../../../types/globals";
import { deleteTour, fetchAllTours } from "../../../utils/api";
import ConfirmModal from "../../ui/modal/confirmModal";
import { useEffect, useState } from "react";

export default function BasicTableOne() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
  useEffect(() => {
    const loadTours = async () => {
      const fetchedTours = await fetchAllTours();
      setTours(fetchedTours);
      setLoading(false);
    };

    loadTours();
  }, []);

  const handleConfirmDelete = async () => {
    if (selectedTourId == null) return;

    const success = await deleteTour(selectedTourId);
    setLoading(true);
    if (success) {
      setTours(tours.filter((t) => t.id !== selectedTourId));
      setSelectedTourId(null);
      setConfirmOpen(false);
    }
    setLoading(false);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this tour?"
      />
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
                Title
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Created at
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Location
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Images
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Price
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tours.map((tour, index) => (
              <TableRow key={tour.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="w-10 h-10">{index + 1}</div>
                </TableCell>

                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div>
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {tour.title}
                    </span>
                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                      id:{tour.id}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {new Date(tour.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {tour.location}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                    {tour.images.slice(0, 3).map((img, index) => (
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
                    {tour.images.length > 3 && (
                      <div className="w-6 h-6 flex justify-center items-center overflow-hidden">
                        <span className="text-xs text-gray-500">
                          +{tour.images.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {tour.price}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={tour.status === "active" ? "success" : "error"}
                  >
                    <span className="capitalize">{tour.status}</span>
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
                  <button
                    onClick={() => {
                      setSelectedTourId(tour.id);
                      setConfirmOpen(true);
                    }}
                    className="text-red-500 hover:text-red-700 text-theme-sm"
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
