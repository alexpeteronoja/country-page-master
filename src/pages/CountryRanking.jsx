import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search';
import Sort from '../Sort';
import axios from 'axios';

function CountryRanking() {
  const [countries, setCountries] = useState([]);
  const [filtered, setfiltered] = useState([]);
  const [noOfcountriesNo, setNoOfCountries] = useState();

  //Filtering Operation
  const [region, setRegion] = useState('');
  const [memberofUN, setMemberofUN] = useState(false);
  const [Independent, setIndependent] = useState(false);
  const [sort, setSort] = useState('');

  // Serching Operation

  const [searchValue, setSearchValue] = useState('');
  const [submit, setSubmit] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(res.data);
        setNoOfCountries(res.data.length);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    let filtered = countries.filter(country => {
      if (region && country.region !== region) return false;
      if (memberofUN && !country.unMember) return false;
      if (Independent && !country.independent) return false;
      if (
        submit &&
        !country.name.common.toLowerCase().includes(submit.toLowerCase())
      )
        return false;
      return true;
    });

    filtered = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.common.localeCompare(b.name.common);

        case 'population':
          return b.population - a.population;

        case 'area':
          return b.area - a.area;

        default:
          return 0;
      }
    });

    setfiltered(filtered);
  }, [region, countries, sort, memberofUN, Independent, submit]);

  useEffect(() => {
    setNoOfCountries(filtered.length);
  }, [filtered]);

  function handleRegion(value) {
    setRegion(value);
  }

  function handleUNMember(event) {
    setMemberofUN(event.target.checked);
  }

  function handleIndependent(event) {
    setIndependent(event.target.checked);
  }

  function handleSorting(event) {
    setSort(event.target.value);
  }

  function handleSearch(event) {
    const { value } = event.target;
    setSearchValue(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmit(searchValue);
  }

  return (
    <>
      <div className="text-center p-5">
        <img src="Logo.svg" alt="" />
      </div>
      <div className="overAllContainer p-lg-5 p-3">
        <Search
          noOfCountries={noOfcountriesNo}
          searchTerm={searchValue}
          handleSearch={handleSearch}
          handleSubmit={handleSubmit}
        />

        <div className="row gx-5 mt-lg-4">
          <div className="col-lg-6">
            <Sort
              america={() => handleRegion('Americas')}
              antarctic={() => handleRegion('Antarctic')}
              africa={() => handleRegion('Africa')}
              asia={() => handleRegion('Asia')}
              europe={() => handleRegion('Europe')}
              oceanic={() => handleRegion('Oceania')}
              handleUNMember={handleUNMember}
              unMemberChecked={memberofUN}
              handleIndependent={handleIndependent}
              independentChecked={Independent}
              handleSorting={handleSorting}
              activeRegion={region}
            />
          </div>

          <div className="col-lg-6">
            <div class="table-responsive">
              <table className="">
                <thead>
                  <tr>
                    <th className="border-bottom">Flag</th>
                    <th className="border-bottom">Name</th>
                    <th className="border-bottom">Population</th>
                    <th className="border-bottom">Area(km²)</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(country => (
                    <tr key={country.cca3}>
                      <td>
                        <img
                          className="flag"
                          src={country.flags.svg}
                          alt={country.flags.alt}
                        />
                      </td>
                      <td>
                        {' '}
                        <Link to={`/country/${country.cca3}`}>
                          {country.name.common}{' '}
                        </Link>
                      </td>
                      <td>{country.population.toLocaleString()}</td>
                      <td>{country.area?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryRanking;
