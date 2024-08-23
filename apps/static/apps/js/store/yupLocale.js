import { helpers } from "services"

const yupLocale = {
  mixed: {
    required: "malumot kiritilishi kerak",
  },
  number: {
    min: ({ min }) => `${min}dan katta bo'lishi kerak`,
    max: ({ max }) => `${helpers.toReadeable(max)}dan kichik bo'lishi kerak`,
  },
  string: {
    min: ({ min }) => `kamida ${min}ta belgidan iborat bo'lishi kerak`,
    max: ({ max }) => `kamida ${max}ta belgidan ko'p bolmasligi kerak`,
  },
  array: {
    min: (obj) => {
      if (obj.min === 1) {
        return "Malumot tanlanishi kerak"
      }
      return obj
    },
  },
}

export default yupLocale
