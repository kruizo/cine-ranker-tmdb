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

const GET = async (endpoint: string, params: Record<string, any> = {}) => {
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

const fetchLatestMovies = async (page = 1) => {
  const params = {
    include_adult: "true",
    include_video: "false",
    language: "en-US",
    sort_by: "popularity.desc",
    page: page,
  };
  return GET("/discover/movie", params);
};

const getHeroUpcomingMovies = async (page = 1) => {
  const params = {
    page: page,
  };
  return GET("/movie/now_playing", params);
};

const fetchAiringToday = async () => {
  return GET("/tv/airing_today");
};

const fetchTrendingTV = async (timeWindow: string) => {
  return GET(`/trending/tv/${timeWindow}`);
};

export {
  searchMovies,
  fetchTrendingTV,
  fetchAiringToday,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchAuthentication,
  getHeroUpcomingMovies,
  fetchLatestMovies,
  fetchMoviesByGenre,
  fetchTrendingAll,
};
