IMAGE_NAME = feedbacksync-frontend

build:
	@echo "Building Docker image..."
	@time docker build -t $(IMAGE_NAME) .

run:
	docker run -p 8080:8080 $(IMAGE_NAME)

clean:
	docker rmi $(IMAGE_NAME)
