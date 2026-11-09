export type StatusKey = "want" | "trip" | "visited" | "fav" | "never";

export type StatusMeta = {
  label: string;
  dot: string;
  bg: string;
  fg: string;
};

export type Place = {
  id: string;
  name: string;
  prov: string;
  tags: string[];
  status: StatusKey;
  lat: number;
  lng: number;
  note: string;
};
