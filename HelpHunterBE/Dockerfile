FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /App

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out
RUN dotnet dev-certs https
RUN dotnet dev-certs https --trust

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /App
COPY --from=build-env /App/out .
COPY --from=build-env /root/.dotnet/corefx/cryptography/x509stores/my/* /root/.dotnet/corefx/cryptography/x509stores/my/
ENV ASPNETCORE_URLS=https://+:5000
ENV MAP_TOKEN=test
ENV JWT_KEY=test2
ENTRYPOINT ["dotnet", "HelpHunterBE.dll"]
EXPOSE 5000