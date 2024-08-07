function extractDate(dayText) {
  const day = new Date(dayText);

  const year = day.getFullYear();
  const month = String(day.getMonth() + 1).padStart(2, "0");
  const date = String(day.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
}

export default extractDate;
