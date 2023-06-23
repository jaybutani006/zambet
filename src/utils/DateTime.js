export const ISOToIST = (dat1) => {
  if (typeof dat1 !== "string") {
    return "pass String.";
  } else if (!dat1.length) {
    return "string length 0";
  }

  const dat2 = new Date(String(dat1));

  return dat2.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    // Comment hour12 to get am/pm
    hour12: false,
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const ISOToMilliSeconds = (dat1) => {
  if (typeof dat1 !== "string") {
    return "pass String.";
  } else if (!dat1.length) {
    return "string length 0";
  }

  const dat2 = new Date(String(dat1));

  return dat2.getTime();
};

export const getYYYYMMDD = (d) => {
  if (!d || typeof d !== "string") {
    return new Date()
  }
  let yourDate = new Date(d)
  const offset = yourDate.getTimezoneOffset()
  yourDate = new Date(yourDate.getTime() - offset * 60 * 1000)
  return yourDate.toISOString().split('T')[0]
}
