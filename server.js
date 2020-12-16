/*-----------------------------------------------------------------------
THIS SERVER IS USED FOR DEFINING LOGIC TO THE FUNCTIONS INSIDE PROTO FILE
AND DECIDES WHAT FUNCTION DOES CLIENT GETS TO USE
-------------------------------------------------------------------------*/

// Importing the proto file needed to use for this service
const PROTO_PATH = __dirname + "/protos/employee.proto";

// Require packages
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const _ = require("lodash");

// PackageDefinition used for generating code from the proto file using protocal buffer compiler
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// defining the employee proto from the proto file
// the "package employee;" we used in proto file comes here and loads all the service and messages inside
let employeeProto = grpc.loadPackageDefinition(packageDefinition).employee;

// dunmmy data for interaction
const { employees } = require("./dummyEmp");

// the function getDetails we defined in employee proto
function getDetails(call, callback) {
  callback(null, {
    message: _.find(employees, { id: call.request.id }),
  });
}

function insert(call, callback) {
  let newrecord = call.request;
  newrecord.id = 4;
  employees.push(newrecord);
  callback(null, { message: newrecord });
}

function getAll(call, callback) {
  callback(null, {
    message: employees,
  });
}

// running the actual server
function main() {
  const server = new grpc.Server(); // instantiate a grpc server

  // Adding the service to server and declaring the user-defined function to the proto function
  // getDetails and getAll is given to let the client know that it can use this function
  server.addService(employeeProto.Employee.service, {
    getDetails: getDetails,
    getAll: getAll,
    insert: insert,
  });

  server.bind("0.0.0.0:3001", grpc.ServerCredentials.createInsecure()); // Binds to a port -- createInsecure() is given to say there is no authentication in the server
  console.log("RUNNING ON 3001");
  server.start();
}

main();
