-- CREATE TABLE "artists" (
--     "id" SERIAL PRIMARY KEY,
--     "artist_name" varchar(80) not null,
--     "year_born" date
-- );

CREATE TABLE "artist" (
	id SERIAL,
	name VARCHAR(80),
	birthdate DATE
);

CREATE TABLE "song" (
	id SERIAL,
	title VARCHAR(255),
	length VARCHAR(10),
	released DATE
);

INSERT INTO "artist"
	("name", "birthdate")
VALUES
	('Ella Fitzgerald', '4-25-1917'),
	('Dave Brubeck', '12-06-1920'),
	('Miles Davis', '5-26-1926'),
	('Esperanza Spalding', '10-18-1984');
	
INSERT INTO "song"
	("title", "length", "released")
VALUES
	('Take Five', '5:24', '1959-09-29'),
	('So What', '9:22', '1959-08-17'),
	('Black Gold', '5:17', '2012-02-01');