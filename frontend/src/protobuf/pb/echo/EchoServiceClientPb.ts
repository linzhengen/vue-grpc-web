/**
 * @fileoverview gRPC-Web generated client stub for echo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as protobuf_pb_echo_echo_pb from '../../../protobuf/pb/echo/echo_pb';


export class EchoClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoEcho = new grpcWeb.MethodDescriptor(
    '/echo.Echo/Echo',
    grpcWeb.MethodType.UNARY,
    protobuf_pb_echo_echo_pb.EchoRequest,
    protobuf_pb_echo_echo_pb.EchoResponse,
    (request: protobuf_pb_echo_echo_pb.EchoRequest) => {
      return request.serializeBinary();
    },
    protobuf_pb_echo_echo_pb.EchoResponse.deserializeBinary
  );

  echo(
    request: protobuf_pb_echo_echo_pb.EchoRequest,
    metadata: grpcWeb.Metadata | null): Promise<protobuf_pb_echo_echo_pb.EchoResponse>;

  echo(
    request: protobuf_pb_echo_echo_pb.EchoRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: protobuf_pb_echo_echo_pb.EchoResponse) => void): grpcWeb.ClientReadableStream<protobuf_pb_echo_echo_pb.EchoResponse>;

  echo(
    request: protobuf_pb_echo_echo_pb.EchoRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: protobuf_pb_echo_echo_pb.EchoResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/echo.Echo/Echo',
        request,
        metadata || {},
        this.methodInfoEcho,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/echo.Echo/Echo',
    request,
    metadata || {},
    this.methodInfoEcho);
  }

}

