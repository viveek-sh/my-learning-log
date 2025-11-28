import path from "path";
import * as grpc from "@grpc/grpc-js";
// import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { fileURLToPath } from "url";
import type { ProtoGrpcType } from "./generated/users.js";
import type { UsersServiceHandlers } from "./generated/UsersService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../src/users.proto")
);

const userProto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const USERS = [
  {
    name: "Vivek",
    course: "Full Stack",
  },
];
const handlers: UsersServiceHandlers = {
  AddUser: (call, callback) => {
    let user = {
      name: call.request.name,
      course: call.request.course,
    };
    USERS.push(user);
    callback(null, user);
  },
  GetUserbyName: (call, callback) => {
    const name = call.request.name;
    const user = USERS.find((u) => u.name === name);

    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "User not found",
      });
    }
    callback(null, user);
  },
};

const server = new grpc.Server();

server.addService(userProto.UsersService.service, handlers);

server.bindAsync(
  "0.0.0.0:5005",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("gRPC server running on 5005");
  }
);
