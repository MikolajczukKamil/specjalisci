FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

COPY /Controllers .
COPY /Properties .
COPY Login.cs .
COPY Program.cs .
COPY WeatherForecast.cs .
COPY HelpHunterBE.sln .
COPY HelpHunterBE.csproj .
COPY appsettings.json .
COPY appsettings.Development.json .

ENV ENV DOTNET_URLS=http://+:5000

EXPOSE 5000

ENTRYPOINT ["dotnet", "run"]