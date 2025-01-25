import GenresList from "../data/genre.js";

const normalizeRating = (rating) => {
  const scaledToFive = (rating / 10) * 5;
  const normalized = parseFloat(scaledToFive.toFixed(1));

  return normalized;
};

const getGenreIdByName = (genres, exact_genre = false) => {
  let genreString = "";

  if (Array.isArray(genres)) {
    const genreIds = genres
      .map((genreName) => {
        const genre = GenresList.find(
          (g) => g.name.toLowerCase() === genreName.toLowerCase()
        );
        return genre?.id;
      })
      .filter(Boolean);
    genreString = exact_genre ? genreIds.join(",") : genreIds.join("|");
  } else if (typeof genres === "string") {
    const genre = GenresList.find(
      (g) => g.name.toLowerCase() === genres.toLowerCase()
    );
    genreString = genre?.id ? genre.id.toString() : "";
  }

  return genreString;
};

export { normalizeRating, getGenreIdByName };
