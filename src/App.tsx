import "./App.css";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SetStateAction, useRef, useState } from "react";
import SchemaDropdown from "./components/shared/SchemaDropDown";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import Select, { SingleValue } from "react-select";
import axios from 'axios'
interface Option {
  label: string;
  value: string;
}

function App() {
  const schemaOptions = [
    { value: "first_name", label: "First Name" },
    { value: "last_name", label: "Last Name" },
    { value: "gender", label: "Gender" },
    { value: "age", label: "Age" },
    { value: "account_name", label: "Account Name" },
    { value: "city", label: "City" },
    { value: "state", label: "State" },
  ];
  const [segmentName, setSegmentName] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [newSchemaOption, setNewSchemaOption] = useState<Option | null>(null);
  
  const apiKey = 'f907f7c5-0b16-460d-bc0c-519966043f85';
  const tokenId = '4d6383bb-8171-4659-9958-f98d12ba3314';
  const handleSaveSegment = async () => {
    const segmentData = {
      segment_name: segmentName,
      schema: selectedOptions.map((option) => ({
        [option.value]: option.label,
      })),
    };

    try {
     await fetch(`https://webhook.site/${apiKey}`,{
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(segmentData),
        method: 'POST',
        mode:'no-cors'
      }).then((res)=>res.json())
      .then((data)=>console.log(data))
      .catch((err)=>console.log(err))
      
    } catch (error) {
      console.log(error)
    }
    // Replace with your actual server communication logic
  };

  const handleAddNewSchema = () => {
    if (newSchemaOption) {
      setSelectedOptions([...selectedOptions, newSchemaOption]);
      setNewSchemaOption(null);
    }
  };

  const handleSelectChange = (option: SingleValue<Option>) => {
    setNewSchemaOption(option as Option);
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side={"bottom"}>
          <SheetHeader>
            <SheetTitle>New Segment</SheetTitle>
          </SheetHeader>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label>Name of segment</Label>
            <Input
              type="text"
              placeholder="Enter a name for segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
            <Label style={{ marginTop: 10 }}>
              To save segment you need to add schemas to build query
            </Label>
            <div className="mt-10">
              {selectedOptions.map((option, index) => (
                <Select
                  key={index}
                  value={option}
                  options={schemaOptions.filter(
                    (schemaOption) => !selectedOptions.includes(schemaOption)
                  )}
                  onChange={(selectedOption) => {
                    const updatedOptions = [...selectedOptions];
                    updatedOptions[index] = selectedOption as Option;
                    setSelectedOptions(updatedOptions);
                  }}
                />
              ))}
              <Select
                value={newSchemaOption}
                onChange={handleSelectChange}
                options={schemaOptions}
                placeholder="Add schema to segment"
              />
              <Button variant={"link"} onClick={handleAddNewSchema}>
                + Add new schema
              </Button>
              <Button variant={"default"} style={{ marginTop: 10 }} onClick={handleSaveSegment}>
                Save Segment
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default App;
