import "./OnScrollLoader.css";

function OnScrollLoader({ loading }) {
  return (
    <div className="OnScrollLoader align-items-end d-flex justify-content-center">
      {loading ? (
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : null}
    </div>
  );
}

export default OnScrollLoader;
