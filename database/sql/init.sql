-- Tworzenie tabeli Users
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    is_providing_services BOOLEAN,
    location VARCHAR(255),
    location_coordinates_x DECIMAL(10, 6),
    location_coordinates_y DECIMAL(10, 6),
    avatar INT,
    phone_number VARCHAR(15),
    description VARCHAR(1000)
);

-- Tworzenie tabeli Categories
CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-- Tworzenie tabeli Services
CREATE TABLE Services (
    service_id SERIAL PRIMARY KEY,
    category_id INT REFERENCES Categories(category_id),
    service_name VARCHAR(100) NOT NULL
);

-- Tworzenie tabeli Available_Services
CREATE TABLE Available_Services (
    available_service_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) NOT NULL,
    service_id INT REFERENCES Services(service_id) NOT NULL,
    category_id INT REFERENCES Categories(category_id) NOT NULL,
    description TEXT,
    max_price DECIMAL(10, 2),
    min_price DECIMAL(10, 2),
    availability VARCHAR(100),
    range DECIMAL(10, 2),
    operating_mode VARCHAR(50)
);

CREATE TABLE Ratings (
    rating_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL
);



-- Wprowadzanie przykładowych danych do tabeli Users
INSERT INTO Users (username, email, password, full_name, date_of_birth, is_providing_services, location, location_coordinates_x, location_coordinates_y)
VALUES
    ('john_doe', 'john@example.com', '$1$IOchfG/z$bZW1pRFA3wuvn6pAuD.Du/', 'Sylwia Jankowska', '1990-01-15', true, 'Warszawa', 52.2297, 21.0122),
    ('Kamil@sggw.com', 'Kamil@sggw.com', '$1$qyDv12Sy$XXa1qlRckgb9tkgJ46QjN/', 'Kamil Mikołajczuk', '1992-03-10', true, 'Kraków', 50.0647, 19.9450),
    ('user_3', 'user3@example.com', 'hashed_password_3', 'Alicja Kowalska', '1992-03-10', true, 'Wrocław', 51.1079, 17.0385),
    ('user_4', 'user4@example.com', 'hashed_password_4', 'Bartłomiej Nowak', '1988-07-05', false, 'Grodzisk Mazowiecki', 51.8972, 20.6305),
    ('user_5', 'user5@example.com', 'hashed_password_5', 'Czesław Malinowski', '1995-12-18', true, 'Grójec', 51.8616, 20.8678),
    ('user_6', 'user6@example.com', 'hashed_password_6', 'Dorota Wójcik', '1980-09-28', false, 'Siedlce', 52.1671, 22.2906),
    ('user_7', 'user7@example.com', 'hashed_password_7', 'Edward Szymański', '1993-04-03', true, 'Białystok', 53.1325, 23.1688),
    ('user_8', 'user8@example.com', 'hashed_password_8', 'Franciszka Jankowska', '1987-11-15', false, 'Radom', 51.4027, 21.1471),
    ('user_9', 'user9@example.com', 'hashed_password_9', 'Grzegorz Pawlak', '1994-06-22', true, 'Gdańsk', 54.3520, 18.6466),
    ('user_10', 'user10@example.com', 'hashed_password_10', 'Hanna Górska', '1983-02-14', false, 'Poznań', 52.4068, 16.9290),
    ('user_11', 'user11@example.com', 'hashed_password_11', 'Igor Kaczmarski', '1996-08-07', true, 'Łódź', 51.7592, 19.4558),
    ('user_12', 'user12@example.com', 'hashed_password_12', 'Joanna Zielińska', '1986-01-25', false, 'Kraków', 50.0647, 19.9450),
    ('user_13', 'user13@example.com', 'hashed_password_13', 'Karol Lewandowski', '1991-05-31', true, 'Szczecin', 53.4289, 14.5530),
    ('user_14', 'user14@example.com', 'hashed_password_14', 'Lidia Woźniak', '1989-10-12', false, 'Katowice', 50.2649, 19.0238),
    ('user_15', 'user15@example.com', 'hashed_password_15', 'Michał Kowalczyk', '1997-11-03', true, 'Wrocław', 51.1079, 17.0385),
    ('user_16', 'user16@example.com', 'hashed_password_16', 'Natalia Adamczyk', '1984-06-09', false, 'Gdynia', 54.5189, 18.5305),
    ('user_17', 'user17@example.com', 'hashed_password_17', 'Oskar Nowicki', '1998-04-20', true, 'Warszawa', 52.2297, 21.0122),
    ('user_18', 'user18@example.com', 'hashed_password_18', 'Patrycja Sokołowska', '1982-09-14', false, 'Lublin', 51.2465, 22.5684),
    ('user_19', 'user19@example.com', 'hashed_password_19', 'Rafał Dąbrowski', '1999-02-27', true, 'Kraków', 50.0647, 19.9450),
    ('user_20', 'user20@example.com', 'hashed_password_20', 'Sylwia Jastrzębska', '1981-12-08', false, 'Warszawa', 52.2297, 21.0122);


-- Wprowadzanie przykładowych danych do tabeli Categories
INSERT INTO Categories (category_name) VALUES
    ('Budowlanka'),
    ('Informatyka'),
    ('Projektowanie'),
    ('Usługi');

-- Wprowadzanie przykładowych danych do tabeli Services z różnymi kategoriami
INSERT INTO Services (category_id, service_name)
VALUES
    (4, 'Malowanie Ścian'),
    (2, 'Tworzenie Aplikacji Mobilnych'),
    (3, 'Projektowanie Graficzne Stron'),
    (1, 'Budowa Domu'),
    (2, 'Bezpieczeństwo Sieciowe'),
    (2, 'Analiza Danych'),
    (4, 'Usługi Sprzątające'),
    (3, 'Tworzenie Stron Internetowych'),
    (1, 'Inżynieria Oprogramowania'),
    (4, 'Naprawa Elektryki'),
    (2, 'Administracja Serwerami'),
    (3, 'Optymalizacja Stron WWW'),
    (1, 'Testowanie Oprogramowania'),
    (1, 'Rozwój Aplikacji Desktopowych'),
    (2, 'Cloud Computing'),
    (4, 'Opieka Dziecięca'),
    (1, 'Programowanie Mikrokontrolerów'),
    (2, 'Sztuczna Inteligencja'),
    (2, 'Cyberbezpieczeństwo'),
    (4, 'Doradztwo Finansowe'),
    (3, 'E-commerce Solutions'),
    (4, 'Montaż Mebli'),
    (1, 'Integracja Systemów');


-- Wprowadzanie przykładowych danych do tabeli Available_Services
INSERT INTO Available_Services (user_id, service_id, category_id, description, max_price, min_price, availability, range, operating_mode)
VALUES
    (1, 1, 4, 'Profesjonalne malowanie ścian w każdym pomieszczeniu', 150.00, 100.00, 'Poniedziałek-Piątek', 30.00, 'Stacjonarne'),
    (2, 2, 2, 'Tworzenie innowacyjnych aplikacji mobilnych na Android i iOS', 200.00, 80.00, 'Elastyczne', 50.00, 'Mobilne'),
    (3, 3, 3, 'Projektowanie atrakcyjnych i responsywnych stron internetowych', 120.00, 80.00, 'Poniedziałek-Piątek', 20.00, 'Stacjonarne'),
    (4, 4, 1, 'Budowa nowoczesnych domów od podstaw', 300.00, 200.00, 'Elastyczne', 100.00, 'Mobilne'),
    (5, 5, 2, 'Zabezpieczanie sieci przed atakami i utrzymanie bezpieczeństwa', 250.00, 150.00, 'Poniedziałek-Piątek', 40.00, 'Stacjonarne'),
    (6, 6, 2, 'Zaawansowane analizy danych i generowanie raportów', 220.00, 150.00, 'Elastyczne', 30.00, 'Mobilne'),
    (7, 7, 4, 'Profesjonalne usługi sprzątające dla domów i biur', 80.00, 50.00, 'Dostępność 24/7', 10.00, 'Stacjonarne'),
    (8, 8, 3, 'Tworzenie responsywnych stron internetowych dla różnych branż', 150.00, 100.00, 'Poniedziałek-Piątek', 25.00, 'Mobilne'),
    (9, 9, 1, 'Tworzenie nowoczesnego oprogramowania według indywidualnych potrzeb', 300.00, 200.00, 'Elastyczne', 80.00, 'Stacjonarne'),
    (10, 10, 4, 'Naprawa i konserwacja instalacji elektrycznych', 180.00, 120.00, 'Dostępność 24/7', 30.00, 'Mobilne'),
    (11, 11, 2, 'Zarządzanie i administrowanie serwerami', 250.00, 150.00, 'Elastyczne', 40.00, 'Stacjonarne'),
    (12, 12, 3, 'Optymalizacja wydajności stron internetowych', 120.00, 80.00, 'Poniedziałek-Piątek', 20.00, 'Mobilne'),
    (13, 13, 1, 'Przeprowadzanie testów funkcjonalnych i wydajnościowych', 200.00, 150.00, 'Dostępność 24/7', 30.00, 'Stacjonarne'),
    (14, 14, 1, 'Rozwój aplikacji desktopowych dla różnych platform', 250.00, 180.00, 'Elastyczne', 50.00, 'Mobilne'),
    (15, 15, 2, 'Usługi związane z wykorzystaniem chmury obliczeniowej', 300.00, 220.00, 'Dostępność 24/7', 60.00, 'Stacjonarne'),
    (16, 16, 4, 'Implementacja rozwiązań do automatyzacji procesów', 200.00, 150.00, 'Poniedziałek-Piątek', 30.00, 'Mobilne'),
    (17, 17, 1, 'Programowanie mikrokontrolerów dla różnych zastosowań', 150.00, 100.00, 'Elastyczne', 20.00, 'Stacjonarne'),
    (18, 18, 2, 'Usługi związane z implementacją sztucznej inteligencji', 300.00, 250.00, 'Dostępność 24/7', 50.00, 'Mobilne'),
    (19, 19, 2, 'Zabezpieczanie systemów przed zagrożeniami cybernetycznymi', 250.00, 180.00, 'Elastyczne', 40.00, 'Stacjonarne'),
    (20, 20, 4, 'Rozwinięte rozwiązania e-commerce i sklepy internetowe', 200.00, 150.00, 'Poniedziałek-Piątek', 30.00, 'Mobilne');

INSERT INTO Ratings (user_id, rating) VALUES
    (1, 4),
    (2, 2),
    (3, 5),
    (4, 1),
    (5, 3),
    (6, 5),
    (7, 2),
    (8, 4),
    (9, 3),
    (10, 1),
    (11, 4),
    (12, 2),
    (13, 5),
    (14, 1),
    (15, 3),
    (16, 5),
    (17, 2),
    (18, 4),
    (19, 3),
    (20, 1);


-- Instalacja rozszerzenia pgcrypto (jeśli jeszcze nie zainstalowane)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Aktualizacja funkcji validate_password
CREATE OR REPLACE FUNCTION validate_password(p_username VARCHAR, p_input_password VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
    stored_password_hash VARCHAR;
BEGIN
    -- Retrieve the stored password hash for the given username
    SELECT password INTO stored_password_hash FROM users WHERE username = p_username;

    -- Verify the input password against the stored hash using pgcrypto
    RETURN crypt(p_input_password, stored_password_hash) = stored_password_hash;
END;
$$ LANGUAGE plpgsql;

-- Funkcja do haszowania przy rejestracji
CREATE OR REPLACE FUNCTION register(p_full_name VARCHAR, p_phone_number VARCHAR, p_email VARCHAR, p_password VARCHAR, p_avatar VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
    email_exists BOOLEAN;
BEGIN
    -- Sprawdzenie, czy podany email jest już zajęty
    SELECT EXISTS (SELECT 1 FROM Users WHERE email = p_email) INTO email_exists;
    -- Jeśli email już istnieje, zwracamy false
    IF email_exists THEN
        RETURN FALSE;
    ELSE
        -- Zaszyfrowanie hasła za pomocą MD5
        p_password := crypt(p_password, gen_salt('md5'));
	-- Wstawienie danych użytkownika do tabeli
        INSERT INTO Users (username, full_name, phone_number, email, password, avatar)
        VALUES (p_email, p_full_name, p_phone_number, p_email, p_password, p_avatar);

        -- Zwracamy true, jeśli użytkownik został pomyślnie zarejestrowany
        RETURN TRUE;
    END IF;
END;
$$ LANGUAGE plpgsql;
