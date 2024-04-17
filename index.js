/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */



// Function to create an employee record
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

// Function to create employee records from nested arrays
function createEmployeeRecords(employeeData) {
  return employeeData.map(employee => createEmployeeRecord(employee));
}

// Function to create a timeIn event for an employee
function createTimeInEvent(employee, timeStamp) {
  const [date, hour] = timeStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  });
  return employee;
}

// Function to create a timeOut event for an employee
function createTimeOutEvent(employee, timeStamp) {
  const [date, hour] = timeStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  });
  return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(event => event.date === date).hour;
  const timeOut = employee.timeOutEvents.find(event => event.date === date).hour;
  return (timeOut - timeIn) / 100; // Convert to hours
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

// Function to calculate pay owed for all dates
// function allWagesFor(employee) {
//   const datesWorked = employee.timeInEvents.map(event => event.date);
//   const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
//   return totalWages;
// }

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};


// Function to find employee by first name
function findEmployeeByFirstName(employees, firstName) {
  return employees.find(employee => employee.firstName === firstName);
}

// Function to calculate payroll for all employees
function calculatePayroll(employees) {
  return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}

//How to use
const employeesData = [
  ["Tim", "Baros", "Engineer", 1],
  ["Vanis", "Kemmy", "Manager", 2]
];

const employeeRecords = createEmployeeRecords(employeesData);
createTimeInEvent(employeeRecords[0], "2024-04-12 0800");
createTimeOutEvent(employeeRecords[0], "2024-04-12 1700");

console.log("Hours worked on 2024-04-12:", hoursWorkedOnDate(employeeRecords[0], "2024-04-12"));
console.log("Wages earned on 2024-04-12:", wagesEarnedOnDate(employeeRecords[0], "2024-04-12"));

const firstNameToSearch = "John";
const foundEmployee = findEmployeeByFirstName(employeeRecords, firstNameToSearch);
if (foundEmployee) {
  console.log(`${firstNameToSearch} found. Total wages earned: $${allWagesFor(foundEmployee)}`);
} else {
  console.log(`${firstNameToSearch} not found.`);
}

console.log("Total payroll:", calculatePayroll(employeeRecords));
