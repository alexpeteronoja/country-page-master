function Sort(props) {
  return (
    <div className="pt-4">
      <div>
        <div className="mb-1">Sort by</div>

        <select
          onChange={props.handleSorting}
          name=""
          id=""
          className="w-100 p-2 rounded-3 select-sort"
        >
          <option value="name">Name</option>
          <option value="population">Population</option>
          <option value="area">Area</option>
        </select>
      </div>
      <div className="mt-3 mb-1">Region</div>
      {/* Button Group */}

      <div className="mt-2 mb-3">
        <button
          onClick={props.america}
          type="button"
          className={`btn btn-bg me-3 my-1 ${props.activeRegion === 'Americas' ? 'active' : ''}`}
        >
          Americas
        </button>

        <button
          onClick={props.antarctic}
          type="button"
          className={`btn me-3 my-1 ${props.activeRegion === 'Antarctic' ? 'active' : ''}`}
        >
          Antarctic
        </button>

        <button
          onClick={props.africa}
          type="button"
          className={`btn btn-bg me-3 my-1 ${props.activeRegion === 'Africa' ? 'active' : ''}`}
        >
          Africa
        </button>

        <button
          onClick={props.asia}
          type="button"
          className={`btn btn-bg me-2 my-1 ${props.activeRegion === 'Asia' ? 'active' : ''}`}
        >
          Asia
        </button>

        <button
          onClick={props.europe}
          type="button"
          className={`btn btn-bg me-3 my-1 ${props.activeRegion === 'Europe' ? 'active' : ''}`}
        >
          Europe
        </button>

        <button
          onClick={props.oceanic}
          type="button"
          className={`btn mx-2 my-1 ${props.activeRegion === 'Oceania' ? 'active' : ''}`}
        >
          Oceania
        </button>
      </div>

      <div className="mb-3 mt-4">Status</div>
      <div>
        <label className="container">
          Member of the United Nations
          <input
            onChange={props.handleUNMember}
            type="checkbox"
            checked={props.unMemberChecked}
          />
          <span className="checkmark"></span>
        </label>

        <label className="container">
          Independent
          <input
            onChange={props.handleIndependent}
            type="checkbox"
            checked={props.independentChecked}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
}

export default Sort;
