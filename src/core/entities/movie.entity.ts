export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  poster: string;
  backdrop: string;
}

export interface FullMovie extends Movie {
  rating: number;
  genres: string[];
  duration: number;
  budget: number;
  originalTitle: string;
  productionCompanies: string[];
}