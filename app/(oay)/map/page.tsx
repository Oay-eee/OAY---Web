import { IconFilter, IconPlus, IconSearch } from '@tabler/icons-react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  H1,
  Input,
  P,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

import { MapView } from '@/app/(oay)/map/_components';

export default function InteractiveMap() {
  return (
    <main className="w-full flex-1">
      <div className="mx-auto h-screen max-w-[1400px] py-8">
        <div className="mb-8 flex flex-row items-center justify-between gap-4">
          <div>
            <H1 className="text-3xl font-bold">Interactive Map</H1>
            <P className="mt-1 text-zinc-400">Explore neighborhoods and view reports by location</P>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <IconPlus className="mr-2 h-4 w-4" />
                Report Issue
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report an Issue</DialogTitle>
                <DialogDescription>
                  Submit a report about an issue in your neighborhood. (This dialog is under development :))
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="relative">
            <IconSearch className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input type="search" placeholder="Search reports..." className="pl-8" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-chart-2 cursor-pointer text-white hover:text-black">
            <div className="flex items-center">
              <IconFilter className="mr-2 h-4 w-4" />
              <span>Reset filters</span>
            </div>
          </Button>
        </div>
        <div className="mb-8 overflow-hidden border bg-zinc-900 shadow-sm">
          <div className="h-[800px]">
            <MapView />
          </div>
        </div>
      </div>
    </main>
  );
}
