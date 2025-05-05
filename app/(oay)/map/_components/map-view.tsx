'use client';

import { useMemo, useState } from 'react';

import { Neighborhood } from '@/assets/mock';
import { IconSearch } from '@tabler/icons-react';
import { Icon } from 'leaflet';
import { MapPin } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { H3 } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

const markerIcon = new Icon({
  iconUrl: 'https://cdn.pixabay.com/photo/2013/07/12/14/10/pushpin-147918_1280.png',
  iconSize: [40, 40],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const InteractiveMap = ({
  selectedId,
  onSelect,
  locations,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
  locations: Location[];
}) => {
  const center = useMemo(() => {
    if (selectedId) {
      const loc = locations.find((f) => f.id === selectedId);
      return loc ? [loc.coordinates.latitude, loc.coordinates.longitude] : [-18.8792, 47.5079];
    }
    return [-18.8792, 47.5079];
  }, [selectedId, locations]);

  return (
    <MapContainer center={center as [number, number]} zoom={13} className="z-0 h-[500px] w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((f) => (
        <Marker
          key={f.id}
          position={[f.coordinates.latitude, f.coordinates.longitude]}
          icon={markerIcon}
          eventHandlers={{
            click: () => onSelect(f.id),
          }}
        >
          <Popup>
            <strong>{f.name}</strong>
            <br />
            <span className="text-muted-foreground text-xs">{f.region}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

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

        <div className="h-[500px] w-2/3 bg-zinc-800">
          <div className="w-full text-center">
            <InteractiveMap selectedId={selectedId} onSelect={setSelectedId} locations={filteredLocations} />
            {selectedLocation && <SelectedInfo location={selectedLocation} />}
          </div>
        </div>
      </div>
    </div>
  );
};
