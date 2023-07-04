import PropTypes from 'prop-types'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input'

const CountrySelect = ({ value, onChange, labels, ...rest }) => (
  <select
    {...rest}
    value={value}
    onChange={event => onChange(event.target.value || undefined)}>
    <option value="">
      {labels['in']}
    </option>
    {getCountries().map((country) => (
      <option key={country} value={getCountryCallingCode(country)}>
        {labels[country]} +{getCountryCallingCode(country)}
      </option>
    ))}
  </select>
)

export default CountrySelect;
