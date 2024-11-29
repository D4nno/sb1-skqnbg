import * as React from "react";
import { Input } from "../common/Input";
import { searchPlaces } from "../../services/maps";

interface LocationInputProps {
  value: string;
  onLocationSelect: (location: string) => void;
  hint: string;
  className?: string;
}

export function LocationInput({
  value,
  onLocationSelect,
  hint,
  className
}: LocationInputProps) {
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const handleTextChange = async (text: string) => {
    onLocationSelect(text);
    
    if (text.length > 2) {
      setIsSearching(true);
      try {
        const places = await searchPlaces(text);
        setSuggestions(places.map(place => place.name));
      } catch (error) {
        console.error("Failed to fetch places:", error);
        setSuggestions([]);
      }
      setIsSearching(false);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <stackLayout className={className}>
      <Input
        value={value}
        onTextChange={handleTextChange}
        hint={hint}
      />
      {isSearching && (
        <activityIndicator busy={true} className="m-2" />
      )}
      {suggestions.length > 0 && (
        <listView
          items={suggestions}
          className="border border-gray-200 rounded-lg"
          onItemTap={(args) => {
            const selectedPlace = suggestions[args.index];
            onLocationSelect(selectedPlace);
            setSuggestions([]);
          }}
        />
      )}
    </stackLayout>
  );
}