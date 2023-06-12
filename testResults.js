// testResults.js

const AllTestResultLog = [];

// Add test results to the list
function addTestResult(result) {
  AllTestResultLog.push(result);
}

// Export the test results list
module.exports = AllTestResultLog;

// Export the function to add test results
module.exports.addTestResult = addTestResult;
