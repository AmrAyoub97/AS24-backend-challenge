DROP TABLE IF EXISTS contacts;

DROP TABLE IF EXISTS listings;

CREATE TYPE seller AS ENUM ('dealer', 'private', 'other');

CREATE TABLE listings(
    id INT,
    make VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    mileage INT,
    seller_type seller NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE contacts(
    listing_id INT NOT NULL,
    contact_date bigint NOT NULL,
    UNIQUE (listing_id, contact_date)
);