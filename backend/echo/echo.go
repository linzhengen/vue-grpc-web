package echo

import (
	"context"
	"log"
	"os"

	pb "github.com/linzhengen/vue-grpc-web/backend/pb/echo"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

type Server struct{}

func (s Server) Echo(ctx context.Context, request *pb.EchoRequest) (*pb.EchoResponse, error) {
	log.Printf("Handling Echo request [%v] with context %v", request, ctx)
	hostname, err := os.Hostname()
	if err != nil {
		log.Printf("Unable to get hostname %v", err)
		hostname = ""
	}
	grpc.SendHeader(ctx, metadata.Pairs("hostname", hostname))
	return &pb.EchoResponse{Content: request.Content}, nil
}

func NewServer() pb.EchoServer {
	return &Server{}
}
