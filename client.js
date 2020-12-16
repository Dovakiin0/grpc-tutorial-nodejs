/* ----------------------------------------------------------------------
This client handles the communication to the express from the grpc server
-------------------------------------------------------------------------*/

const PROTO_PATH = __dirname + "/protos/employee.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const _ = require("lodash");

// PackageDefinition used for generating code from the proto file using protocal buffer compiler
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  enums: String,
  longs: String,
  defaults: true,
  oneofs: true,
});

const employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

// Creating client and binding to the port of the grpc server for communcation
// this client holds every function inside employee package
let client = new employee_proto.Employee(
  "localhost:3001",
  grpc.credentials.createInsecure()
);

// exporting for using on api
module.exports = client;
