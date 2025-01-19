import Card from "@components/Card";
import { IMovieCollection } from "@customTypes/index";

interface ContentProps {
  movies: IMovieCollection;
}

const Content: React.FC<ContentProps> = ({ movies }) => {
  const { results } = movies;
  let cards = [];

  console.log(movies);

  for (let index = 0; index < results.length; index++) {
    cards.push(
      <Card
        key={index}
        title={results[index].title}
        poster_path={`https://image.tmdb.org/t/p/w500${results[index].poster_path}`}
        overview={results[index].overview}
        release_date={results[index].release_date}
        vote_average={results[index].vote_average}
        vote_count={results[index].vote_count}
        genre_ids={results[index].genre_ids}
        popularity={results[index].popularity}
        original_language={results[index].original_language}
      />
    );
  }
  return (
    <div className="max-w-6xl  px-5">
      <span className="flex py-7">
        <span>
          <h1 className="border-l-[var(--accent)] border-l-[12px] px-4 text-2xl font-extrabold text-primary-content">
            RECOMMENDED
          </h1>
        </span>
      </span>
      <div className="flex">
        <div className="grid gap-4 grid-cols-3  h-fit grid-rows-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {cards.map((card, index) => (
            <div key={index} className="aspect-w-1 aspect-h-1">
              {card}
            </div>
          ))}
        </div>
        <aside>
          <div className="w-96  hidden xl:block p-3">
            <h1 className="text-2xl font-bold text-primary-content">
              Trending Now
            </h1>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Content;
