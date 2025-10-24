# asp net docker images
FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine

RUN apk update && \
    apk add --no-cache curl nano lsof jq unzip dos2unix aws-cli tzdata nginx openssl

ENV TZ=Asia/Kathmandu 
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app
COPY /App.js/ /app/rigohr/artifacts/workhorse/

WORKDIR /app/rigohr/artifacts/workhorse
EXPOSE 80


CMD ["sh", "-c", "/app/startup.sh"]

