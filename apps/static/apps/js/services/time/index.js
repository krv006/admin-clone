import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"
import "dayjs/locale/uz-latn"

dayjs.locale("uz-latn")

dayjs.extend(calendar)

const to = (timestamp, format = "DD.MM.YYYY HH:mm:ss") => dayjs(timestamp).format(format)

const add = (time, amount, unit) => dayjs(time).add(amount, unit)

const diff = (fromTime, toTime) => dayjs(fromTime).diff(toTime)

const toChat = (timestamp) =>
  dayjs(timestamp).calendar(null, {
    sameDay: "[Today at] h:mm A", // The same day ( Today at 2:30 AM )
    nextDay: "[Tomorrow at] h:mm A", // The next day ( Tomorrow at 2:30 AM )
    nextWeek: "dddd [at] h:mm A", // The next week ( Sunday at 2:30 AM )
    lastDay: "[Yesterday at] h:mm A", // The day before ( Yesterday at 2:30 AM )
    lastWeek: "[Last] dddd [at] h:mm A", // Last week ( Last Monday at 2:30 AM )
    sameElse: "DD/MM/YYYY", // Everything else ( 17/10/2011 )
  })

const toYear = (timestamp) => dayjs.unix(timestamp).get("year")
const isValid = (timestamp) => dayjs(timestamp).isValid()
const toUnix = (timestamp) => dayjs(timestamp).unix()

export default { to, toChat, toYear, diff, add, toUnix, isValid }
