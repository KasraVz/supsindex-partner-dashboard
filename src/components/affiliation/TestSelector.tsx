import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

interface Test {
  id: string;
  name: string;
  type: string;
}

interface TestSelectorProps {
  selectedTests: string[];
  onSelectionChange: (testIds: string[]) => void;
}

const availableTests: Test[] = [
  { id: 'fpa', name: 'Founder Public Awareness (FPA)', type: 'Standard' },
  { id: 'eea', name: 'Ecosystem Environment Awareness (EEA)', type: 'Standard' },
  { id: 'geb', name: 'General Entrepreneurial Behavior (GEB)', type: 'Premium' },
];

export function TestSelector({ selectedTests, onSelectionChange }: TestSelectorProps) {
  const [open, setOpen] = useState(false);

  const handleTestToggle = (testId: string) => {
    const newSelection = selectedTests.includes(testId)
      ? selectedTests.filter(id => id !== testId)
      : [...selectedTests, testId];
    onSelectionChange(newSelection);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Select Tests for Affiliation Code
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedTests.length > 0
              ? `${selectedTests.length} test${selectedTests.length > 1 ? 's' : ''} selected`
              : 'Select tests...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search tests..." />
            <CommandEmpty>No tests found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {availableTests.map((test) => (
                  <CommandItem key={test.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedTests.includes(test.id)}
                      onCheckedChange={() => handleTestToggle(test.id)}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{test.name}</div>
                      <div className="text-xs text-muted-foreground">{test.type}</div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}