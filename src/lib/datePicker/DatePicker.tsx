"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerType = {
  setDate: (value: Date | undefined) => void;
  date: Date | undefined;
  select: string
};

function DatePicker({ setDate, date, select }: DatePickerType) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3 w-fit border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-fit justify-between font-normal focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            {date ? date.toLocaleDateString() : select}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(newDate) => {
              setDate(newDate);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker;
