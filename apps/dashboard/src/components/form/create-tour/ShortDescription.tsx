import ComponentCard from "../../common/ComponentCard";
import { useState } from "react";
import { FormData } from "../../../types/globals";
import Input from "../input/InputField";
import Button from "../../ui/button/Button";
import Badge from "../../ui/badge/Badge";
import { PlusIcon } from "../../../icons";

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string>;
}

export default function TagSelect({ errors, setFormData }: Props) {
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };
  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setFormData((prev) => ({
        ...prev,
        tags: [...tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <ComponentCard title="Tags">
      <div className="space-y-6">
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <Input
              type="text"
              value={tagInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Enter tags, separated by commas"
              className="input w-full"
            />
          </div>
          <Button size="sm" variant="outline" onClick={handleAddTag}>
            Add
          </Button>
        </div>

        {/* Display added tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="light"
                color="primary"
                startIcon={<PlusIcon />}
              >
                <div className="flex gap-3 items-center justify-center">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-red-500"
                  >
                    &times;
                  </button>
                </div>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {errors.tags && (
        <div className="text-sm text-error-500">{errors.tags}</div>
      )}
    </ComponentCard>
  );
}
