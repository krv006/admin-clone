import ReactDatePicker from "react-datepicker"
import propTypes from "prop-types"
import { useFormContext } from "react-hook-form"

import "react-datepicker/dist/react-datepicker.css"
import "./datepicker.scss"

function Datepicker({ name, label, required, initialDate, onChange, ...props }) {
  const { setValue, getValues, watch } = useFormContext()
  watch(name)

  return (
    <div className="form-group react-datepicker">
      <label className={`form-label ${required ? "required" : ""}`} htmlFor="input">
        {label}
      </label>
      <ReactDatePicker
        selected={getValues()[name]}
        onChange={(date) => {
          onChange(date)
          setValue(name, date)
        }}
        {...props}
      />
    </div>
  )
}

export default Datepicker

Datepicker.propTypes = {
  label: propTypes.string,
  name: propTypes.string.isRequired,
  required: propTypes.bool,
  initialDate: propTypes.oneOfType([propTypes.instanceOf(Date), propTypes.instanceOf(null)]),
  onChange: propTypes.func,
}

Datepicker.defaultProps = {
  label: "",
  required: false,
  initialDate: null,
  onChange: () => {},
}
