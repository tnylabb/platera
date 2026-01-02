-- =================================================================
-- PLATERA ADATBÁZIS - OLASZ ÉTTEREM
-- =================================================================

DROP DATABASE IF EXISTS platera;
CREATE DATABASE platera DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE platera;

-- ==========================================
-- 0. RESTAURANT_INFO
-- ==========================================
CREATE TABLE RESTAURANT_INFO (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT 'Platera Olasz Étterem',
    address VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    openhours VARCHAR(255)
);

INSERT INTO RESTAURANT_INFO (address, phone, email, openhours) 
VALUES ('Budapest, Andrássy út 12.', '+36 1 234 5678', 'info@platera.hu', 'H-V: 11:00 - 23:00');

-- ==========================================
-- 1. EMPLOYEE (Alap személyzet)
-- ==========================================
CREATE TABLE EMPLOYEE (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'waiter', 'chef') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jelszavak (teszt): 'admin123', 'waiter123', 'chef123'
INSERT INTO EMPLOYEE (full_name, email, password, role) VALUES 
('Giuseppe Manager', 'admin@platera.hu', 'admin123', 'admin'),
('Mario Pincér', 'mario@platera.hu', 'waiter123', 'waiter'),
('Luigi Pincér', 'luigi@platera.hu', 'waiter123', 'waiter'),
('Antonio Séf', 'antonio@platera.hu', 'chef123', 'chef');

-- ==========================================
-- 2. TABLE
-- ==========================================
CREATE TABLE `TABLE` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    table_number INT NOT NULL UNIQUE,
    capacity INT NOT NULL,
    status ENUM('available', 'occupied', 'reserved', 'out_of_service') DEFAULT 'available'
);

INSERT INTO `TABLE` (table_number, capacity, status) VALUES 
(1, 2, 'available'), (2, 2, 'available'), (3, 4, 'available'), (4, 4, 'available'), 
(5, 4, 'available'), (6, 6, 'available'), (7, 6, 'available'), (8, 2, 'available');

-- ==========================================
-- 3. CATEGORY
-- ==========================================
CREATE TABLE CATEGORY (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

INSERT INTO CATEGORY (id, name, description) VALUES 
(1, 'Előételek', 'Könnyű olasz fogások kezdésnek'),
(2, 'Tészták', 'Hagyományos pasta ételek'),
(3, 'Pizzák', 'Nápolyi stílusú pizzák'),
(4, 'Desszertek', 'Dolce vita');

-- ==========================================
-- 4. INGREDIENT
-- ==========================================
CREATE TABLE INGREDIENT (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

INSERT INTO INGREDIENT (name) VALUES 
('Paradicsom'), ('Bazsalikom'), ('Mozzarella'), ('Kenyér'), -- 1-4
('Olívaolaj'), ('Pármai sonka'), ('Szalámi'), ('Gomba'),   -- 5-8
('Tojás'), ('Pancetta'), ('Pecorino'), ('Tészta'),         -- 9-12
('Fokhagyma'), ('Chili'), ('Szarvasgomba'), ('Vaj'),       -- 13-16
('Parmezán'), ('Bolognai ragu'), ('Besamel'), ('Ricotta'), -- 17-20
('Gorgonzola'), ('Rukkola'), ('Mascarpone'), ('Kávé'),     -- 21-24
('Babapiskóta'), ('Tejszín'), ('Erdei gyümölcs'),          -- 25-27
('Pisztácia'), ('Fagylalt'), ('Rizs');                     -- 28-30

-- ==========================================
-- 5. MENU_ITEM
-- ==========================================
CREATE TABLE MENU_ITEM (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (category_id) REFERENCES CATEGORY(id) ON DELETE SET NULL
);

INSERT INTO MENU_ITEM (category_id, name, description, price, available) VALUES 
-- Előételek (Cat: 1)
(1, 'Bruschetta Classica', 'Pirított kenyér, friss paradicsom, bazsalikom', 1800, 1),
(1, 'Caprese Salata', 'Buffalo mozzarella, paradicsom, friss bazsalikom', 2400, 1),
(1, 'Antipasto Misto', 'Olasz felvágottak, sajt, olajbogyó', 3200, 1),
(1, 'Arancini', 'Töltött rizsgombóc, marinara szósz', 2100, 1),

-- Tészták (Cat: 2)
(2, 'Spaghetti Carbonara', 'Tojás, pancetta, pecorino sajt', 3200, 1),
(2, 'Penne Arrabbiata', 'Csípős paradicsom szósz, fokhagyma', 2900, 1),
(2, 'Tagliatelle al Tartufo', 'Friss szarvasgomba, vaj, parmezán', 4500, 1),
(2, 'Lasagne Bolognese', 'Rétegelt tészta, bolognai ragu, besamel', 3500, 1),

-- Pizzák (Cat: 3)
(3, 'Margherita', 'Paradicsom, mozzarella, bazsalikom', 2600, 1),
(3, 'Quattro Formaggi', 'Mozzarella, gorgonzola, parmezán, ricotta', 3400, 1),
(3, 'Diavola', 'Csípős szalámi, mozzarella, chili', 3100, 1),
(3, 'Prosciutto e Rucola', 'Pármai sonka, rukkola, parmezán', 3600, 1),

-- Desszertek (Cat: 4)
(4, 'Tiramisu', 'Mascarpone, babapiskóta, kávé', 1800, 1),
(4, 'Panna Cotta', 'Vaníliás tejszínhab, erdei gyümölcs', 1600, 1),
(4, 'Cannoli Siciliani', 'Ricottás töltelék, pisztácia', 1900, 1),
(4, 'Gelato Trio', 'Három gombóc olasz fagylalt', 1400, 1);

-- ==========================================
-- 6. MENU_ITEM_INGREDIENT
-- ==========================================
CREATE TABLE MENU_ITEM_INGREDIENT (
    menu_item_id INT,
    ingredient_id INT,
    PRIMARY KEY (menu_item_id, ingredient_id),
    FOREIGN KEY (menu_item_id) REFERENCES MENU_ITEM(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES INGREDIENT(id) ON DELETE CASCADE
);

INSERT INTO MENU_ITEM_INGREDIENT (menu_item_id, ingredient_id) VALUES 
(1, 4), (1, 1), (1, 2), -- Bruschetta (Kenyér, Pari, Bazs)
(2, 3), (2, 1), (2, 2), -- Caprese (Mozzarella, Pari, Bazs)
(5, 9), (5, 10), (5, 11), (5, 12), -- Carbonara (Tojás, Pancetta, Pecorino, Tészta)
(9, 1), (9, 3), (9, 2), -- Margherita (Pari, Mozzarella, Bazs)
(13, 23), (13, 24), (13, 25); -- Tiramisu (Mascarpone, Kávé, Piskóta)

-- ==========================================
-- 7. ÜRES RENDELÉSI TÁBLÁK
-- ==========================================

CREATE TABLE CART (
    id INT PRIMARY KEY AUTO_INCREMENT,
    table_id INT,
    waiter_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (table_id) REFERENCES `TABLE`(id) ON DELETE CASCADE,
    FOREIGN KEY (waiter_id) REFERENCES EMPLOYEE(id) ON DELETE SET NULL
);

CREATE TABLE CART_ITEM (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT,
    menu_item_id INT,
    quantity INT NOT NULL DEFAULT 1,
    note TEXT,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES CART(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES MENU_ITEM(id) ON DELETE CASCADE
);

CREATE TABLE `ORDER` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    table_id INT,
    waiter_id INT,
    status ENUM('pending', 'preparing', 'ready', 'served', 'cancelled') DEFAULT 'pending',
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    waiting_time INT,
    FOREIGN KEY (table_id) REFERENCES `TABLE`(id),
    FOREIGN KEY (waiter_id) REFERENCES EMPLOYEE(id)
);

CREATE TABLE ORDER_ITEM (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    menu_item_id INT,
    quantity INT NOT NULL DEFAULT 1,
    note TEXT,
    unit_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'preparing', 'ready', 'served') DEFAULT 'pending',
    FOREIGN KEY (order_id) REFERENCES `ORDER`(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES MENU_ITEM(id)
);

CREATE TABLE BILL (
    id INT PRIMARY KEY AUTO_INCREMENT,
    table_id INT,
    waiter_id INT,
    bill_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('cash', 'card', 'transfer') NOT NULL,
    status ENUM('unpaid', 'paid', 'cancelled') DEFAULT 'unpaid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP NULL,
    FOREIGN KEY (table_id) REFERENCES `TABLE`(id),
    FOREIGN KEY (waiter_id) REFERENCES EMPLOYEE(id)
);

CREATE TABLE BILL_ITEM (
    id INT PRIMARY KEY AUTO_INCREMENT,
    bill_id INT,
    item_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    note TEXT,
    FOREIGN KEY (bill_id) REFERENCES BILL(id) ON DELETE CASCADE
);

CREATE TABLE SPLIT_BILL (
    id INT PRIMARY KEY AUTO_INCREMENT,
    original_bill_id INT,
    part_number INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('cash', 'card', 'transfer') NOT NULL,
    status ENUM('unpaid', 'paid', 'cancelled') DEFAULT 'unpaid',
    paid_at TIMESTAMP NULL,
    FOREIGN KEY (original_bill_id) REFERENCES BILL(id) ON DELETE CASCADE
);

CREATE TABLE SPLIT_BILL_ITEM (
    id INT PRIMARY KEY AUTO_INCREMENT,
    split_bill_id INT,
    item_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    note TEXT,
    FOREIGN KEY (split_bill_id) REFERENCES SPLIT_BILL(id) ON DELETE CASCADE
);