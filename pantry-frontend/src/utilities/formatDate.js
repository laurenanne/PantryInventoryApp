function formatDate(date) {
  if (date) {
    return date.toString().slice(0, 10);
  }
}

export default formatDate;
