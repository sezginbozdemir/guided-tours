import ComponentCard from "../../common/ComponentCard";
import Button from "../../ui/button/Button";
import Input from "../input/InputField";
import { useEffect, useState } from "react";

interface TourSection {
  title: string;
  items: string[];
  input: string;
}
interface Props {
  updateTourDetails: (tourDetails: Record<string, string[]>) => void;
  errors: Record<string, string>;
}

export default function TourInfoInputs({ errors, updateTourDetails }: Props) {
  const [sections, setSections] = useState<TourSection[]>([]);
  const [newTitle, setNewTitle] = useState("");

  const addSection = () => {
    const trimmed = newTitle.trim();
    if (!trimmed || sections.some((s) => s.title === trimmed)) return;

    setSections([...sections, { title: trimmed, items: [], input: "" }]);
    setNewTitle("");
  };

  const removeSection = (title: string) => {
    setSections(sections.filter((s) => s.title !== title));
  };

  const updateInput = (index: number, value: string) => {
    const updated = [...sections];
    updated[index].input = value;
    setSections(updated);
  };

  const addItem = (index: number) => {
    if (!sections[index].input.trim()) return;
    const updated = [...sections];
    updated[index].items.push(updated[index].input.trim());
    updated[index].input = "";
    setSections(updated);
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    const updated = [...sections];
    updated[sectionIndex].items.splice(itemIndex, 1);
    setSections(updated);
  };
  const generateSectionsObject = () => {
    const result = sections.reduce(
      (acc, section) => {
        acc[section.title] = section.items;
        return acc;
      },
      {} as Record<string, string[]>
    );

    return result;
  };

  useEffect(() => {
    const tourDetails = generateSectionsObject();
    updateTourDetails(tourDetails);
  }, [sections]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSection();
    }
  };
  const handleKeyItems = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem(index);
    }
  };

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Left Column: Form */}
      <div className="space-y-6">
        <ComponentCard title="Tour Details">
          <div className="flex space-x-2 w-full">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Section title (e.g. inclusions,exclusions..)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                hint={errors.tourDetails ? errors.tourDetails : ""}
                error={errors.tourDetails ? true : false}
                onKeyDown={handleKeyPress}
              />
            </div>

            <Button size="sm" variant="outline" onClick={addSection}>
              Add Section
            </Button>
          </div>
          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{section.title}</h3>
                <button
                  onClick={() => removeSection(section.title)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder={`Add item to ${section.title.toLowerCase()}`}
                    onKeyDown={(e) => handleKeyItems(e, index)}
                    value={section.input}
                    onChange={(e) => updateInput(index, e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addItem(index)}
                >
                  Add
                </Button>
              </div>

              <ul className="space-y-2 w-full">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded w-full"
                  >
                    <span className="flex-1 break-words mr-2">{item}</span>
                    <button
                      onClick={() => removeItem(index, i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ComponentCard>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <ComponentCard title="Details Summary">
          <div className="space-y-4 max-h-[70vh] overflow-auto">
            {sections.length === 0 && (
              <p className="text-gray-500 text-sm my-3">
                No sections added yet.
              </p>
            )}

            {sections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-base mb-1">
                  {section.title}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {section.items.length === 0 ? (
                    <li className="text-gray-400 italic">No items</li>
                  ) : (
                    section.items.map((item, i) => <li key={i}>{item}</li>)
                  )}
                </ul>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
