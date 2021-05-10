import './App.css';

function App() {
  return (
    <div className="App">

      <main>

        <section class="py-5 text-center container bg-dark text-white">
          <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
              <h1 class="fw-light">Search Photos</h1>
            </div>
          </div>
        </section>

        <div class="album py-5 bg-light">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {
                [...Array(10)].map(i => (
                  <div class="col">
                    <div class="card shadow-sm">
                      <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}

export default App;
