CREATE DATABASE pernbands;

CREATE TABLE bands(
    bands_id SERIAL PRIMARY KEY, 
    name VARCHAR(25), date VARCHAR(100) 
);

SELECT * FROM bands;