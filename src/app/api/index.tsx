import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const GET = async (
  endpoint: string,
  params: Record<string, string | number | boolean> = {}
) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (err) {
    console.error("Error making API request:", err);
    throw new Error("Failed to fetch data");
  }
};

const fetchAuthentication = async () => {
  try {
    const response = await api.get("/authentication");
    return response.data;
  } catch (error) {
    console.error("Error fetching authentication data:", error);
    throw new Error("Failed to fetch authentication data");
  }
};

// search movies
const searchMovies = async (query: string) => {
  return GET("/search/movie", { query });
};

// fetch popular movies
const fetchPopularMovies = async () => {
  return GET("/movie/popular");
};

// fetch trending movies
const fetchTrendingMovies = async (timeWindow: string) => {
  return GET(`/trending/movie/${timeWindow}`);
};

// fetch movies by genre
const fetchMoviesByGenre = async (genreId: string) => {
  return GET(`/genre/${genreId}/movies`);
};

const fetchTrendingAll = async (type: string, timeWindow: string) => {
  return GET(`/trending/all/${timeWindow}`);
};

const fetchDiscoverMovies = async ({
  page = 1,
  keywords = "",
  genres = "",
  companyIds = "",
  sort_by = "popularity",
  include_adult = false,
  include_video = false,
  language = "en-US",
  minVoteAverage = 8,
  releaseYearAfter = 2015,
}) => {
  const sort_order: Record<string, string> = {
    popularity: "popularity.desc",
    release_date: "first_air_date.desc",
    revenue: "revenue.desc",
    vote_average: "vote_average.desc",
  };

  const params = {
    page: page,
    sort_by: sort_order[sort_by],
    ...(include_adult && { include_adult: include_adult }),
    ...(include_video && { include_video: include_video }),
    ...(language && { language: language }),
    ...(keywords && { with_keywords: keywords }),
    ...(genres && { with_genres: genres }),
    ...(companyIds && { with_companies: companyIds }),
    ...(minVoteAverage && { "vote_average.gte": minVoteAverage }),
    ...(releaseYearAfter && {
      "primary_release_date.gte": `${releaseYearAfter}-01-01`,
    }),
  };
  return GET("/discover/movie", params);
};

const fetchDiscoverTVShows = async ({
  page = 1,
  keywords = "",
  genres = "",
  companyIds = "",
  sort_by = "popularity",
  include_adult = false,
  include_video = false,
  language = "en-US",
  minVoteAverage = 8,
  releaseYearAfter = 2015,
}) => {
  const sort_order: Record<string, string> = {
    popularity: "popularity.desc",
    release_date: "first_air_date.desc",
    revenue: "revenue.desc",
    vote_average: "vote_average.desc",
  };

  const params = {
    page: page,
    sort_by: sort_order[sort_by],
    ...(include_adult && { include_adult: include_adult }),
    ...(include_video && { include_video: include_video }),
    ...(language && { language: language }),
    ...(keywords && { with_keywords: keywords }),
    ...(genres && { with_genres: genres }),
    ...(companyIds && { with_companies: companyIds }),
    ...(minVoteAverage && { "vote_average.gte": minVoteAverage }),
    ...(releaseYearAfter && {
      "primary_release_date.gte": `${releaseYearAfter}-01-01`,
    }),
  };
  return GET("/discover/tv", params);
};

const fetchNowPlayingMovies = async (page = 1) => {
  const params = {
    page: page,
  };
  return GET("/movie/now_playing", params);
};

const fetchUpcomingMovies = async (page = 1, language = "en") => {
  const params = {
    page: page,
    language: language,
  };

  return GET("/movie/upcoming", params);
};

const fetchAiringToday = async (page = 1, language = "en") => {
  const params = {
    page: page,
    language: language,
  };
  return GET("/tv/airing_today", params);
};

const fetchTrendingTV = async (timeWindow: string) => {
  return GET(`/trending/tv/${timeWindow}`);
};

const fetchPopularTV = async (page = 1, language = "en") => {
  const params = {
    page: page,
    language: language,
  };
  return GET("/tv/popular", params);
};

const fetchKeywordId = async (keyword: string, page = 1) => {
  const params = {
    query: keyword,
    page: page,
  };
  return GET("/search/keyword", params);
};

const fetchTrailerVIdeosById = async (id: number) => {
  return GET(`/movie/${id}/videos`, { movie_id: id });
};

const fetchMovieDetailsById = async (id: string) => {
  return GET(`/movie/${id}`);
};

export {
  searchMovies,
  fetchUpcomingMovies,
  fetchTrailerVIdeosById,
  fetchMovieDetailsById,
  fetchKeywordId,
  fetchPopularTV,
  fetchTrendingTV,
  fetchAiringToday,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchAuthentication,
  fetchDiscoverTVShows,
  fetchNowPlayingMovies,
  fetchDiscoverMovies,
  fetchMoviesByGenre,
  fetchTrendingAll,
};
