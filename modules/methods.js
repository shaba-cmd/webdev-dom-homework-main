export const replaceMethod = (el) => {
  return el.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};

export const nowDateTime = (date) => {
  const formateDate = "2-digit";

  const nowDate = new Date(date)
    .toLocaleString("ru-RU", {
      day: formateDate,
      month: formateDate,
      year: formateDate,
      hour: formateDate,
      minute: formateDate,
    })
    .replace(/,/, "");

  return nowDate;
};
