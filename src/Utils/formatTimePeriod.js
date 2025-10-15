import moment from "moment-timezone";

export const getFormattedTimePeriod = (
  from,
  to,
  units = `YMD`,
  decimalFormat = false
) => {
  let validFrom, validTo;

  if (from.toLowerCase() === "present") {
    validFrom = moment();
  } else {
    validFrom = moment(from, `D-MMM-YYYY`, true);
  }

  if (to.toLowerCase() === "present") {
    validTo = moment();
  } else {
    validTo = moment(to, `D-MMM-YYYY`, true);
  }

  if (!validFrom.isValid() || !validTo.isValid()) {
    throw new Error(`Invalid date format: ${from} or ${to}`);
  }
  if (validFrom.isAfter(validTo)) {
    throw new Error(`from > to : ${from} ${to}`);
  }

  let years = validTo.diff(validFrom, "years");
  validFrom.add(years, "years");

  let months = validTo.diff(validFrom, "months");
  validFrom.add(months, "months");

  let days = validTo.diff(validFrom, "days");
  validFrom.add(days, "days");

  let hours = validTo.diff(validFrom, "hours");
  validFrom.add(hours, "hours");

  let minutes = validTo.diff(validFrom, "minutes");
  validFrom.add(minutes, "minutes");

  let seconds = validTo.diff(validFrom, "seconds");

  if (decimalFormat) {
    const datePart = [years > 0 && `${years}`, months > 0 && `${months}`]
      .filter(Boolean)
      .join(".");
    return `${datePart}+ years`;
  }

  const datePart = [
    years > 0 && `${years}Y`,
    months > 0 && `${months}M`,
    days > 0 && `${days}D`,
  ]
    .filter(Boolean)
    .join(", ");

  const includeTime =
    units.includes("h") || units.includes("m") || units.includes("s");

  if (includeTime) {
    const timePart = [
      units.includes("h") ? String(hours).padStart(2, "0") : "00",
      units.includes("m") ? String(minutes).padStart(2, "0") : "00",
      units.includes("s") ? String(seconds).padStart(2, "0") : "00",
    ].join(":");
    return `${datePart} - ${timePart}`;
  } else {
    return datePart;
  }
};
