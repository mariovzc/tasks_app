PROJECT_NAME=node_base
PORT=8000

build:
	docker build -t ${PROJECT_NAME} .

shell:
	docker run -it --rm -p ${PORT}:${PORT}  \
	-v $(shell pwd):/app \
	--entrypoint=/bin/ash ${PROJECT_NAME}
