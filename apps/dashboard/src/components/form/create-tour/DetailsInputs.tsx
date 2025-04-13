import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "../input/TextArea";
import Radio from "../input/Radio";
import { FormData } from "../../../types/globals";
import { useEffect, useState } from "react";
import { fetchAllLocations } from "../../../utils/api";

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<any>>; // to directly update state
  formData: FormData;
  errors: Record<string, string>;
}

export default function DetailsInputs({
  errors,
  setFormData,
  formData,
}: Props) {
  const [locations, setLocations] = useState<
    { value: string; label: string }[]
  >([]);
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const fetchedLocations = await fetchAllLocations();
        const formattedLocations = fetchedLocations.map(
          (loc: { name: string }) => ({
            value: loc.name.toLowerCase(),
            label: loc.name,
          })
        );
        setLocations(formattedLocations);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    loadLocations();
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev: FormData) => ({ ...prev, location: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev: FormData) => ({ ...prev, label: value }));
  };
  const handleClearRadio = () => {
    setFormData((prev: FormData) => ({ ...prev, label: "" }));
  };

  const handleTextAreaChange = (value: string) => {
    setFormData((prev: FormData) => ({ ...prev, shortDescription: value }));
  };

  const radioLabels = [
    { value: "popular", label: "Popular" },
    { value: "best deal", label: "Best Deal" },
  ];

  return (
    <ComponentCard title="Details">
      <div className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            error={errors.title ? true : false}
            hint={errors.title ? errors.title : ""}
            type="text"
            id="title"
            placeholder="Tour title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>Location</Label>
          <Select
            options={locations}
            placeholder="Select Destination"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
          {errors.location && (
            <div className="text-xs text-error-500">{errors.location}</div>
          )}
        </div>
        <div>
          <Label htmlFor="duration">Duration</Label>
          <Input
            error={errors.duration ? true : false}
            hint={errors.duration ? errors.duration : ""}
            type="text"
            id="duration"
            placeholder="Tour duration"
            value={formData.duration}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-wrap items-center gap-8">
          {radioLabels.map((radio, idx) => (
            <Radio
              id={radio.value}
              key={idx}
              name="tag"
              value={radio.value}
              checked={formData.label === radio.value}
              onChange={handleRadioChange}
              label={radio.label}
            />
          ))}
          <button
            type="button"
            className="text-sm text-red-500 hover:text-red-700"
            onClick={handleClearRadio}
          >
            Clear
          </button>
        </div>
        <div>
          <Label htmlFor="label">
            Label <span className="text-xs text-gray-400"> (optional)</span>
          </Label>
          <Input
            type="text"
            id="label"
            placeholder="Tour label"
            value={formData.label}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            error={errors.price ? true : false}
            hint={errors.price ? errors.price : ""}
            type="number"
            id="price"
            placeholder="Tour price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>Short description</Label>
          <TextArea
            error={errors.shortDescription ? true : false}
            hint={errors.shortDescription ? errors.shortDescription : ""}
            placeholder="Short description"
            value={formData.shortDescription}
            onChange={handleTextAreaChange}
            rows={3}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
