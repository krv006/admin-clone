import ReactDatePicker from "react-datepicker"
import propTypes from "prop-types"
import { useFormContext } from "react-hook-form"
import { get } from "lodash"

import "react-datepicker/dist/react-datepicker.css"
import "./datepicker.scss"

function RangePicker({ name, label, required, initialDate, onChange, ...props }) {
  const { setValue, watch } = useFormContext()
  const value = watch(name, initialDate)

  return (
    <div className="form-group react-datepicker">
      <label className={`form-label ${required ? "required" : ""}`} htmlFor="input">
        {label}
      </label>
      <ReactDatePicker
        selected={get(value, "start")}
        onChange={(dates) => {
          const [start, end] = dates
          onChange(dates)
          setValue(name, { start, end })
        }}
        startDate={get(value, "start")}
        endDate={get(value, "end")}
        selectsRange
        {...props}
      />
    </div>
  )
}

export default RangePicker

RangePicker.propTypes = {
  label: propTypes.string,
  name: propTypes.string.isRequired,
  required: propTypes.bool,
  initialDate: propTypes.string,
  onChange: propTypes.func,
}

RangePicker.defaultProps = {
  label: "",
  required: false,
  initialDate: { start: null, end: null },
  onChange: () => {},
}
