docker-build:
	docker build -t andrevarandas/covid-19-api .
docker-run:
	docker run --rm -it -p 3000:3000 andrevarandas/covid-19-api
