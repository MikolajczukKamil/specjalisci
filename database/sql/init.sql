-- Tworzenie tabeli Users
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_providing_services BOOLEAN
);

-- Wprowadzanie przykładowych danych do tabeli Users
INSERT INTO Users (username, email, password, full_name, date_of_birth, is_providing_services)
VALUES
    ('john_doe', 'john@example.com', '$1$IOchfG/z$bZW1pRFA3wuvn6pAuD.Du/', 'Sylwia Jankowska', '1990-01-15', true),
    ('Kamil@sggw.com', 'Kamil@sggw.com', '$1$qyDv12Sy$XXa1qlRckgb9tkgJ46QjN/', 'Kamil Mikołajczuk', '1992-03-10', true),
    ('user_3', 'user3@example.com', 'hashed_password_3', 'Alicja Kowalska', '1992-03-10', true),
    ('user_4', 'user4@example.com', 'hashed_password_4', 'Bartłomiej Nowak', '1988-07-05', false),
    ('user_5', 'user5@example.com', 'hashed_password_5', 'Czesław Malinowski', '1995-12-18', true),
    ('user_6', 'user6@example.com', 'hashed_password_6', 'Dorota Wójcik', '1980-09-28', false),
    ('user_7', 'user7@example.com', 'hashed_password_7', 'Edward Szymański', '1993-04-03', true),
    ('user_8', 'user8@example.com', 'hashed_password_8', 'Franciszka Jankowska', '1987-11-15', false),
    ('user_9', 'user9@example.com', 'hashed_password_9', 'Grzegorz Pawlak', '1994-06-22', true),
    ('user_10', 'user10@example.com', 'hashed_password_10', 'Hanna Górska', '1983-02-14', false),
    ('user_11', 'user11@example.com', 'hashed_password_11', 'Igor Kaczmarski', '1996-08-07', true),
    ('user_12', 'user12@example.com', 'hashed_password_12', 'Joanna Zielińska', '1986-01-25', false),
    ('user_13', 'user13@example.com', 'hashed_password_13', 'Karol Lewandowski', '1991-05-31', true),
    ('user_14', 'user14@example.com', 'hashed_password_14', 'Lidia Woźniak', '1989-10-12', false),
    ('user_15', 'user15@example.com', 'hashed_password_15', 'Michał Kowalczyk', '1997-11-03', true),
    ('user_16', 'user16@example.com', 'hashed_password_16', 'Natalia Adamczyk', '1984-06-09', false),
    ('user_17', 'user17@example.com', 'hashed_password_17', 'Oskar Nowicki', '1998-04-20', true),
    ('user_18', 'user18@example.com', 'hashed_password_18', 'Patrycja Sokołowska', '1982-09-14', false),
    ('user_19', 'user19@example.com', 'hashed_password_19', 'Rafał Dąbrowski', '1999-02-27', true),
    ('user_20', 'user20@example.com', 'hashed_password_20', 'Sylwia Jastrzębska', '1981-12-08', false);

-- Tworzenie tabeli Services
CREATE TABLE Services (
    service_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    availability VARCHAR(100),
    location VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Wprowadzanie przykładowych danych do tabeli Services
INSERT INTO Services (user_id, service_name, description, price, availability, location)
VALUES
    (1, 'Tworzenie Aplikacji Mobilnych', 'Rozwinięte usługi tworzenia aplikacji mobilnych', 120.00, 'Poniedziałek-Piątek', 'Warszawa'),
    (2, 'Projektowanie Graficzne Stron', 'Kreatywne usługi projektowania graficznego stron internetowych', 80.00, 'Elastyczne', 'Kraków'),
    (3, 'Administrowanie Systemami', 'Zarządzanie i konserwacja systemów informatycznych', 150.00, 'Dostępność 24/7', 'Wrocław'),
    (4, 'Bezpieczeństwo Sieciowe', 'Usługi związane z zabezpieczaniem sieci przed atakami', 200.00, 'Poniedziałek-Piątek', 'Poznań'),
    (5, 'Analiza Danych', 'Zaawansowane usługi analizy danych i raportowania', 180.00, 'Elastyczne', 'Gdańsk'),
    (6, 'Wsparcie Helpdesk', 'Pomoc techniczna i wsparcie użytkowników', 100.00, 'Dostępność 24/7', 'Łódź'),
    (7, 'Tworzenie Stron Internetowych', 'Profesjonalne usługi tworzenia stron internetowych', 120.00, 'Poniedziałek-Piątek', 'Katowice'),
    (8, 'Inżynieria Oprogramowania', 'Tworzenie oprogramowania pod indywidualne potrzeby', 250.00, 'Elastyczne', 'Szczecin'),
    (9, 'Bazy Danych', 'Zarządzanie bazami danych i usługi migracji danych', 160.00, 'Poniedziałek-Piątek', 'Bydgoszcz'),
    (10, 'Administracja Serwerami', 'Konserwacja i zarządzanie serwerami', 180.00, 'Dostępność 24/7', 'Lublin'),
    (11, 'Optymalizacja Stron WWW', 'Usługi optymalizacji wydajności stron internetowych', 90.00, 'Elastyczne', 'Gdynia'),
    (12, 'Testowanie Oprogramowania', 'Przeprowadzanie testów funkcjonalnych i wydajnościowych', 140.00, 'Poniedziałek-Piątek', 'Kraków'),
    (13, 'Rozwój Aplikacji Desktopowych', 'Tworzenie aplikacji desktopowych dla różnych platform', 200.00, 'Elastyczne', 'Warszawa'),
    (14, 'Cloud Computing', 'Usługi związane z wykorzystaniem chmury obliczeniowej', 220.00, 'Dostępność 24/7', 'Poznań'),
    (15, 'Automatyzacja Procesów Biznesowych', 'Implementacja rozwiązań do automatyzacji procesów', 180.00, 'Poniedziałek-Piątek', 'Wrocław'),
    (16, 'Programowanie Mikrokontrolerów', 'Tworzenie programów dla mikrokontrolerów', 120.00, 'Elastyczne', 'Kraków'),
    (17, 'Sztuczna Inteligencja', 'Usługi związane z implementacją sztucznej inteligencji', 250.00, 'Dostępność 24/7', 'Gdańsk'),
    (18, 'Cyberbezpieczeństwo', 'Zabezpieczanie systemów przed zagrożeniami cybernetycznymi', 200.00, 'Poniedziałek-Piątek', 'Poznań'),
    (19, 'E-commerce Solutions', 'Rozwinięte rozwiązania e-commerce i sklepy internetowe', 180.00, 'Elastyczne', 'Katowice'),
    (20, 'Integracja Systemów', 'Usługi związane z integracją różnych systemów informatycznych', 160.00, 'Poniedziałek-Piątek', 'Szczecin');

-- Tworzenie tabeli Services_orders
CREATE TABLE Services_orders (
    order_id SERIAL PRIMARY KEY,
    buyer_id INT REFERENCES Users(user_id) NOT NULL,
    seller_id INT REFERENCES Users(user_id) NOT NULL,
    service_id INT REFERENCES Services(service_id) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES Users(user_id),
    FOREIGN KEY (seller_id) REFERENCES Users(user_id),
    FOREIGN KEY (service_id) REFERENCES Services(service_id)
);

-- Wprowadzanie przykładowych danych do tabeli Services_orders
INSERT INTO Services_orders (buyer_id, seller_id, service_id, amount)
VALUES
    (1, 2, 1, 100.00),
    (2, 1, 2, 50.00),
    (3, 4, 3, 150.00),
    (4, 3, 4, 200.00),
    (5, 6, 5, 180.00),
    (6, 5, 6, 100.00),
    (7, 8, 7, 120.00),
    (8, 7, 8, 250.00),
    (9, 10, 9, 160.00),
    (10, 9, 10, 180.00),
    (11, 12, 11, 90.00),
    (12, 11, 12, 140.00),
    (13, 14, 13, 200.00),
    (14, 13, 14, 220.00),
    (15, 16, 15, 180.00),
    (16, 15, 16, 120.00),
    (17, 18, 17, 250.00),
    (18, 17, 18, 200.00),
    (19, 20, 19, 180.00),
    (20, 19, 20, 160.00),
    (1, 3, 1, 120.00),
    (2, 4, 2, 80.00),
    (3, 5, 3, 150.00),
    (4, 6, 4, 200.00),
    (5, 7, 5, 180.00),
    (6, 8, 6, 100.00),
    (7, 9, 7, 120.00),
    (8, 10, 8, 250.00),
    (9, 11, 9, 160.00),
    (10, 12, 10, 180.00),
    (11, 13, 11, 90.00),
    (12, 14, 12, 140.00),
    (13, 15, 13, 200.00),
    (14, 16, 14, 220.00),
    (15, 17, 15, 180.00),
    (16, 18, 16, 120.00),
    (17, 19, 17, 250.00),
    (18, 20, 18, 200.00),
    (19, 1, 19, 180.00),
    (20, 2, 20, 160.00);



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
