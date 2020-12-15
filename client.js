const PROTO_PATH = __dirname + "/protos/employee.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const _ = require("lodash");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  enums: String,
  longs: String,
  defaults: true,
  oneofs: true,
});

const employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

function main() {
  let client = new employee_proto.Employee(
    "localhost:3000",
    grpc.credentials.createInsecure()
  );

  if (process.argv.length >= 3) {
    employeeid = process.argv[2];
  } else {
    employeeid = 2;
  }

  client.getDetails({ id: employeeid }, function (err, response) {
    console.log(
      `Employee Details from Employee ${employeeid} is: `,
      response.message
    );
  });
}

main();
