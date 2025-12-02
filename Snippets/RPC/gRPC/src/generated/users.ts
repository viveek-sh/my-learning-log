import type * as grpc from "@grpc/grpc-js";
import type { MessageTypeDefinition } from "@grpc/proto-loader";

import type {
  GetUserbyNameReq as _GetUserbyNameReq,
  GetUserbyNameReq__Output as _GetUserbyNameReq__Output,
} from "./GetUserbyNameReq.ts";
import type { User as _User, User__Output as _User__Output } from "./User.ts";
import type {
  UsersServiceClient as _UsersServiceClient,
  UsersServiceDefinition as _UsersServiceDefinition,
} from "./UsersService.ts";

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  GetUserbyNameReq: MessageTypeDefinition<
    _GetUserbyNameReq,
    _GetUserbyNameReq__Output
  >;
  User: MessageTypeDefinition<_User, _User__Output>;
  UsersService: SubtypeConstructor<typeof grpc.Client, _UsersServiceClient> & {
    service: _UsersServiceDefinition;
  };
}
