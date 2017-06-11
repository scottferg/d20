FROM alpine

RUN apk --no-cache add ca-certificates && \
    update-ca-certificates

COPY ./build /build
COPY ./cloud-storage.json /cloud-storage.json
COPY ./autocert /var/cache/autocert
COPY ./d20_viewer /d20_viewer

EXPOSE 80 443

ENTRYPOINT ["/d20_viewer"]
