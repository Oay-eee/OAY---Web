'use client';

import { useMemo, useState } from 'react';

import { Neighborhood } from '@/assets/mock';
import { IconSearch } from '@tabler/icons-react';
import { MapPin } from 'lucide-react';

import { H3, P } from '@/components/ui';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type Location = (typeof Neighborhood)[number];

const SearchInput = ({ query, onChange }: { query: string; onChange: (value: string) => void }) => (
  <div className="relative">
    <IconSearch className="absolute top-2.5 left-2.5 h-4 w-4" />
    <Input
      type="search"
      placeholder="Search locations..."
      className="pl-8"
      value={query}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const LocationList = ({
  locations,
  selectedId,
  onSelect,
}: {
  locations: Location[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) => (
  <div className="overflow-hidden">
    <H3 className="mb-5">Neighbor(s) ({locations.length})</H3>
    <div className="max-h-[400px] space-y-5 overflow-y-auto p-2">
      {locations.length > 0 ? (
        locations.map((f) => (
          <Button
            key={f.id}
            variant="ghost"
            className={`flex w-full items-center justify-start p-5 text-left ${selectedId === f.id ? 'bg-muted' : ''}`}
            onClick={() => onSelect(f.id)}
          >
            <MapPin className="mr-2 h-4 w-4" />
            <div>
              <div>{f.name}</div>
              <div className="text-muted-foreground text-xs">{f.region}</div>
            </div>
          </Button>
        ))
      ) : (
        <div className="text-muted-foreground py-4 text-center">No locations found</div>
      )}
    </div>
  </div>
);

const MapPlaceholder = ({ selectedId, onSelect }: { selectedId: string | null; onSelect: (id: string) => void }) => (
  <div className="border-border relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg border">
    <div className="bg-oay-neutral-200 absolute inset-0 opacity-10" />
    {Neighborhood.map((f) => {
      const top = 20 + Math.random() * 60;
      const left = 20 + Math.random() * 60;
      return (
        <Tooltip key={f.id}>
          <TooltipTrigger asChild>
            <div
              className={`absolute h-3 w-3 transform cursor-pointer rounded-full transition-all ${
                selectedId === f.id ? 'bg-oay-green scale-150' : 'bg-oay-blue'
              }`}
              style={{ top: `${top}%`, left: `${left}%` }}
              onClick={() => onSelect(f.id)}
            />
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs">
              <p className="font-medium">{f.name}</p>
              <p className="text-muted-foreground">{f.region}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      );
    })}
    <Badge className="hover:bg-chart-2 absolute right-4 bottom-4 cursor-pointer bg-zinc-950 text-white">
      Interactive 3D Map Coming Soon
    </Badge>
  </div>
);

const SelectedInfo = ({ location }: { location: Location }) => (
  <div className="bg-card mt-4 rounded-md border p-3 text-left">
    <h4 className="font-medium">{location.name}</h4>
    <p className="text-muted-foreground text-sm">{location.region}</p>
    <div className="mt-2 flex gap-2">
      <Button size="sm">View Reports</Button>
      <Button size="sm" variant="outline">
        Emergency Contacts
      </Button>
    </div>
  </div>
);

export const MapView = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return query
      ? Neighborhood.filter((f) => f.name.toLowerCase().includes(query) || f.region.toLowerCase().includes(query))
      : Neighborhood;
  }, [searchQuery]);

  const selectedLocation = useMemo(() => Neighborhood.find((f) => f.id === selectedId), [selectedId]);

  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-4">
        <div className="w-1/3 space-y-4 p-5">
          <SearchInput query={searchQuery} onChange={setSearchQuery} />
          <LocationList locations={filteredLocations} selectedId={selectedId} onSelect={setSelectedId} />
        </div>

        <div className="flex h-[500px] w-full flex-col items-center justify-center bg-zinc-800 p-6 md:w-2/3">
          <div className="text-center">
            <H3>Interactive Map Placeholder</H3>
            <P className="text-muted-foreground mb-4 text-sm">
              In the full implementation, this would be an interactive 3D map using React Three Fiber showing all the
              locations in Madagascar.
            </P>
            <MapPlaceholder selectedId={selectedId} onSelect={setSelectedId} />
            {selectedLocation && <SelectedInfo location={selectedLocation} />}
          </div>
        </div>
      </div>
    </div>
  );
};
