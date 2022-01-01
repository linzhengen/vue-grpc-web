# Choose the output directory
OUTPUT ?= ./go

# Choose the target language.
LANGUAGE ?= go

# Choose grpc plugin
GRPCPLUGIN ?= $(shell go env GOPATH)/bin/protoc-gen-go-grpc


# Choose the proto include directory.
PROTOINCLUDE ?= ./protobuf/vendor/protobuf/src

# Choose protoc binary
PROTOC ?= protoc

# Compile the entire repository
#
# NOTE: if "protoc" command is not in the PATH, you need to modify this file.
#


FLAGS+= --proto_path=.:$(PROTOINCLUDE)
FLAGS+= --go_out=./backend/pb --go-grpc_out=./backend/pb --go-grpc_opt require_unimplemented_servers=false
FLAGS+= --js_out=import_style=commonjs,binary:./frontend/src
FLAGS+= --grpc-web_out=import_style=typescript,mode=grpcweb:./frontend/src
FLAGS+=	--plugin=protoc-gen-grpc=$(GRPCPLUGIN)

SUFFIX:= pb.go

DEPS:= $(shell find ./protobuf/pb  -type f -name '*.proto' | sed "s/proto$$/$(SUFFIX)/")

all: clean $(DEPS)

%.$(SUFFIX):  %.proto
	mkdir -p ./backend/pb ./frontend/src/protobuf
	$(PROTOC) $(FLAGS) $*.proto

clean:
	rm -rf ./backend/pb ./frontend/src/protobuf

evans:
	@hash evans > /dev/null 2>&1; if [ $$? -ne 0 ]; then \
		go install github.com/ktr0731/evans@latest; \
	fi
	evans --host localhost --port 8000 --reflection

init:
	go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
	cd frontend && pnpm install