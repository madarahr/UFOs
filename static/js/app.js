// from data.js
const tableData = data;
// get table references
var tbody = d3.select("tbody");
function buildTable(data) {
  // Clear out any existing data
  tbody.html("");
  // loop through each object in the data and append a row of cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table
    let row = tbody.append("tr");
    // Loop through each field in the dataRow and add each value as a table cell
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}


// Track the filters
var filters = {};
// handleClick function
function applyFilters() {
  // Save the element, value, and id of the filters
    filters.datetime = d3.select("#datetime").property("value");
    filters.city = d3.select("#city").property("value");
    filters.state = d3.select("#state").property("value");
    filters.country = d3.select("#country").property("value");
    filters.shape = d3.select("#shape").property("value");
    console.log(filters)
  // If a filter value was entered then add that filter and value to the filters list. Clear the filter from the filters object otherwise.
  Object.keys(filters).forEach(key => filters[key] === "" ? delete filters[key] : {});
  // Apply all filters and build the table
  filterTable();
}


function filterTable() {
  // Set the filteredData to the tableData
  let filteredData = tableData;
  // Loop through all of the filters and keep any data that matches the filter values
    Object.entries(filters).forEach(([key, value]) => {
      filteredData = filteredData.filter(row => row[key] === value);
    });
  // BUild the table using the filtered Data
  buildTable(filteredData);
}


// function to clear table filters
function clearFilters() {
    location.reload();
}
// Event to listen for changes to each filter
d3.selectAll("#filter-btn").on("click", applyFilters);
d3.selectAll("#clear-btn").on("click", clearFilters);
// Build the table when the page loads
buildTable(tableData);