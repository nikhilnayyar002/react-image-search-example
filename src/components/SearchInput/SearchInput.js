function SearchInput({ search }) {
  return (
    <div className="pt-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search .."
        onInput={(e) => search(e.target.value)}
      />
    </div>
  );
}

export default SearchInput;
