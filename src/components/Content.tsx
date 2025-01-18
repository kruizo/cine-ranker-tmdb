import Card from "@components/Card";

function Content() {
  const cards = [];

  for (let index = 0; index < 10; index++) {
    cards.push(<Card key={index} />);
  }
  return (
    <div className="max-w-6xl">
      <span className="flex py-7">
        <svg width="20" height="30">
          <rect width="7" height="30" className="fill-accent" />
        </svg>
        <span>
          <h1 className="text-2xl font-bold text-primary-content">
            Recently added
          </h1>
        </span>
      </span>
      <div className="flex">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {cards.map((card, index) => (
            <div key={index} className="aspect-w-1 aspect-h-1">
              {card}
            </div>
          ))}
        </div>
        <aside>
          <div className="w-96 test hidden xl:block p-3">
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
