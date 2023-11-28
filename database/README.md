# Jak uruchomić
1. Wchodzimy do katalogu specjalisci
2. Używamy polecenia docker-compose -f database/init.yaml up -d

# Jak zaciągnąć zmiany
0. Zaciągamy zmiany z githuba lub wprowadzając coś ręcznie do pliku database/sql/init.sql
1. Wchodzimy do katalogu specjalisci
2. docker rm -f database-specjalisci
3. docker-compose -f database/init.yaml up -d

# Jak się podłączyć
Nazwa serwera: database-specjalisci <br>
Adres: localhost<br>
Port: 5438<br>
Username: postgres<br>
Hasło: !qqG9zfE^Ze!4k