export interface StreetSegment {
  id: string;
  status: "Occupied" | "Available" | "Blocked";
  vehicleId?: string;
  position: number; // percentage 0-100
  size: number; // pixel width
}

export interface StreetZoneGroup {
  id: string;
  name: string;
  segments: StreetSegment[];
}

export type ZoneMode = "street" | "designated";
