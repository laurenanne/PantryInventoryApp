const { BadRequestError } = require("../expressError");

// Data to update can include: { firstName, lastName, password, email }. This function takes the data
// and alters the javascript to the SQl format needed for the query.
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);

  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Jack', phone: '917-000-0000'} => ['"first_name"=$1', '"phone"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  // returns an object with the columns being updated set equal to $1, $2 etc and an array of new values of the columns.
  // {setCols: "first_name"=$1, "last_name"=$2, values: [ 'newFirstName', 'newLastName' ]}

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
