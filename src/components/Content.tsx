import Card from "@components/Card";

function Content() {
  const cards = [];

  for (let index = 0; index < 20; index++) {
    cards.push(<Card key={index} />);
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
}

export default Content;
