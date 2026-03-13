export interface RawgSearchResultInterface {
  results: RawgGameDataInterface[];
}

export interface RawgGameDataInterface {
  id: number;
  name: string;
  description: string;
  released: string;
  background_image: string;
  platforms: {
    platform: {
      name: string;
    };
    released_at: string;
  }[];
}
