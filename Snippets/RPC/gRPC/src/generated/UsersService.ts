// Original file: src/users.proto

import type * as grpc from "@grpc/grpc-js";
import type { MethodDefinition } from "@grpc/proto-loader";
import type {
  GetUserbyNameReq as _GetUserbyNameReq,
  GetUserbyNameReq__Output as _GetUserbyNameReq__Output,
} from "./GetUserbyNameReq.ts";
import type { User as _User, User__Output as _User__Output } from "./User.ts";

export interface UsersServiceClient extends grpc.Client {
  AddUser(
    argument: _User,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
  AddUser(
    argument: _User,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
  AddUser(
    argument: _User,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
  AddUser(
    argument: _User,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
  addUser(
    argument: _User,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
  addUser(
    argument: _User,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
  addUser(
    argument: _User,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
  addUser(
    argument: _User,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;

  GetUserbyName(
    argument: _GetUserbyNameReq,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
  GetUserbyName(
    argument: _GetUserbyNameReq,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
  GetUserbyName(
    argument: _GetUserbyNameReq,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
  GetUserbyName(
    argument: _GetUserbyNameReq,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
  getUserbyName(
    argument: _GetUserbyNameReq,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
  getUserbyName(
    argument: _GetUserbyNameReq,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
  getUserbyName(
    argument: _GetUserbyNameReq,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
  getUserbyName(
    argument: _GetUserbyNameReq,
    callback: grpc.requestCallback<_User__Output>
  ): grpc.ClientUnaryCall;
}

export interface UsersServiceHandlers
  extends grpc.UntypedServiceImplementation {
  AddUser: grpc.handleUnaryCall<_User__Output, _User>;

  GetUserbyName: grpc.handleUnaryCall<_GetUserbyNameReq__Output, _User>;
}

export interface UsersServiceDefinition extends grpc.ServiceDefinition {
  AddUser: MethodDefinition<_User, _User, _User__Output, _User__Output>;
  GetUserbyName: MethodDefinition<
    _GetUserbyNameReq,
    _User,
    _GetUserbyNameReq__Output,
    _User__Output
  >;
}
