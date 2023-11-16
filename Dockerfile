ARG BASE_IMAGE=node:20.9.0-alpine

FROM ${BASE_IMAGE}

COPY . app/
WORKDIR /app

RUN npm ci && npm cache clean --force

ENTRYPOINT [ "npm" ]
CMD [ "test" ]
