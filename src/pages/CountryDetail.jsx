import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/Logo.svg';

function CountryDetail() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [border, setBorder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function FetchCountryDetails() {
      try {
        const res = await axios.get(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );

        const fetchedcountry = res.data[0];
        setCountry(fetchedcountry);

        if (fetchedcountry && fetchedcountry.borders.length > 0) {
          const borderdata = await axios.get(
            `https://restcountries.com/v3.1/alpha?codes=${fetchedcountry.borders.join(',')}`
          );
          const fetchBorders = borderdata.data;
          setBorder(fetchBorders);
        } else {
          setBorder([]);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    FetchCountryDetails();
  }, [countryCode]);

  console.log(border);

  if (loading) return <div>Loading Country ...</div>;

  return (
    <>
      <div className="text-center m-5">
        <img src={Logo} alt="" />
      </div>

      <div className="p-4 detail-container my-4">
        <div>
          <img
            className="detail-img"
            src={country.flags.svg}
            alt={country.flags.alt}
          />
        </div>

        <div>
          <p className="fs-3">{country.name.common}</p>
          <p>{country.name.official}</p>
        </div>

        <div className="d-flex justify-content-between">
          <div className=" pop-container px-3 py-2 rounded-3 ">
            Population | {country.population}
          </div>
          <div className=" pop-container  px-3 py-2 rounded-3">
            Area(km) | {country.area}
          </div>
        </div>

        <div>
          <table className="detail-table my-4 ">
            <tbody>
              <tr>
                <th>Capital</th>
                <td>{country.capital}</td>
              </tr>
              <tr>
                <th>Subregion</th>
                <td>{country.subregion}</td>
              </tr>
              <tr>
                <th>Language</th>
                <td>
                  {country.languages
                    ? Object.values(country.languages).join(', ')
                    : 'N/A'}
                </td>
              </tr>
              <tr>
                <th>Currencies</th>
                <td>
                  {country.currencies
                    ? Object.values(country.currencies)
                        .map(c => `${c.name} (${c.symbol || 'No Symbol'})`)
                        .join(', ')
                    : 'N/A'}
                </td>
              </tr>
              <tr>
                <th>Continents</th>
                <td>{country.continents}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-start">
            <p>Neighbouring Countries</p>
            <div className="d-flex flex-wrap row-gap-4 column-gap-3 justify-content-between">
              {border.map(country => (
                <div key={country.cca3}>
                  <Link to={`/country/${country.cca3}`}>
                    <img
                      className="border-img"
                      src={country.flags.svg}
                      alt={country.flags.alt}
                    />
                    <div>{country.name.common}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryDetail;
