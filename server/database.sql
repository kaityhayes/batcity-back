CREATE DATABASE pernbands;

CREATE TABLE bands(
    bands_id SERIAL PRIMARY KEY, 
    name VARCHAR(25), date VARCHAR(100)
);

SELECT * FROM bands;


CREATE DATABASE upcoming;

CREATE TABLE upcoming(
    upcoming_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    date DATE NOT NULL,
    image TEXT NOT NULL,
    venue TEXT NOT NULL
);

SELECT * FROM upcoming;