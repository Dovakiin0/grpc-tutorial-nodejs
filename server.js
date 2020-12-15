const PROTO_PATH = __dirname + "/protos/employee.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const _ = require("lodash");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

let employeeProto = grpc.loadPackageDefinition(packageDefinition).employee;

const { employees } = require("./dummyEmp");

function getDetails(call, callback) {
  callback(null, {
    message: _.find(employees, { id: call.request.id }),
  });
}

function main() {
  const server = new grpc.Server();
  server.addService(employeeProto.Employee.service, { getDetails: getDetails });
  server.bind("0.0.0.0:3000", grpc.ServerCredentials.createInsecure());
  console.log("RUNNING ON 3000");
  server.start();
}

main();
