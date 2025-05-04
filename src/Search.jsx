function Search(props) {
  return (
    <div className="row">
      <div className="col-lg-6">
        <p>Found {props.noOfCountries} countries</p>
      </div>

      <div className="col-lg-6">
        <form action="">
          <div className="position-relative">
            <div className="position-absolute">
              <button
                onClick={props.handleSubmit}
                type="submit"
                className=" submit-btn"
              >
                <img src="Search.svg" alt="" />
              </button>
            </div>

            <div>
              <input
                type="text"
                className="search-form py-2 ps-5 pe-1"
                placeholder="Search by Name, Region.."
                value={props.searchTerm}
                onChange={props.handleSearch}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
