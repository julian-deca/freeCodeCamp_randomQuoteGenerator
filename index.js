function APP() {
  const [quotes, setQuotes] = React.useState([]);
  const [randomQuotes, setRandomQuotes] = React.useState("");
  const [color, setColor] = React.useState("#5B5EA6");

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();

      setQuotes(data);
      let index = Math.floor(Math.random() * data.length);
      setRandomQuotes(data[index]);
    }
    fetchData();
  }, []);
  function changeQuote() {
    const colors = [
      "#34568B",
      "#FF6F61",
      "#6B5B95",
      "#88B04B",
      "#F7CAC9",
      "#92A8D1",
      "#955251",
      "#009B77",
      "#5B5EA6",
      "#D65076",
      "#98B4D4",
    ];

    let cIndex = Math.floor(Math.random() * colors.length);
    setColor(colors[cIndex]);
    let index = Math.floor(Math.random() * quotes.length);
    setRandomQuotes(quotes[index]);
  }

  return (
    <div style={{ backgroundColor: color, minHeight: "100vh" }} id="back">
      <div
        className="container pt-5 "
        id="quote-box"
        style={{ maxWidth: "700px" }}
      >
        <div className="p-5 mb-4 rounded-3" id="bord">
          <div className="card">
            <div className="card-header">
              <h6 className="text-center">Random Quote Machine</h6>
            </div>
            <div className="card-body">
              {randomQuotes ? (
                <>
                  <h5 className="card-title" id="text">
                    "{randomQuotes.text}"
                  </h5>
                  <p className="card-text " id="author">
                    -{randomQuotes.author || "No author"}
                  </p>
                </>
              ) : (
                <h2>loading...</h2>
              )}
              <div className="row justify-content-center">
                <button
                  className="btn btn-primary w-25 m-2"
                  onClick={changeQuote}
                  id="new-quote"
                >
                  next quote
                </button>

                <a
                  className="btn btn-default  w-25 m-2"
                  id="tweet-quote"
                  href={
                    "https://twitter.com/intent/tweet?text=" +
                    encodeURIComponent(
                      '"' + randomQuotes.text + '"\n-' + randomQuotes.author
                    )
                  }
                  target="_blank"
                >
                  <i className="fa fa-twitter text-primary"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const w = { maxWidth: 700 };

ReactDOM.render(<APP />, document.getElementById("container"));
