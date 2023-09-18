CREATE TABLE food(
    food_id SERIAl PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    inventory INTEGER NOT NULL
  );

CREATE TABLE purchases(
    purchase_id SERIAL PRIMARY KEY,
    date DATE NOT NULL
);

CREATE TABLE purchase_items(
    purchase_id SERIAL NOT NULL REFERENCES purchases,
    food_id SERIAL NOT NULL REFERENCES food,
    PRIMARY KEY(purchase_id, food_id),
    quantity INTEGER NOT NULL,
    price_per_unit NUMERIC NOT NULL
        CHECK(price_per_unit > 0.0)
);

CREATE TABLE clients(
    client_id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    alt_first_name TEXT,
    last_name TEXT NOT NULL,
    alt_last_name TEXT,
    address TEXT,
    phone TEXT,
    alt_phone TEXT,
    number_adults_in_family INTEGER,
    number_kids_in_family INTEGER,
    receive_benefits TEXT,
    is_eligible BOOLEAN NOT NULL, 
    race TEXT,
    is_hispanic TEXT, 
    create_date DATE,
    last_visit DATE
);

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    client_id SERIAL NOT NULL REFERENCES clients,
    date DATE NOT NULL
);


CREATE TABLE order_items(
    order_id SERIAL NOT NULL REFERENCES orders,
    food_id SERIAL NOT NULL REFERENCES food,
    PRIMARY KEY (order_id, food_id),
    quantity INTEGER NOT NULL  
);


CREATE TABLE users(
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
      CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN NOT NULL DEFAULT TRUE
);

