drop database if exists dcdb;

create database dcdb;

\c dcdb

CREATE TABLE artists (
  id serial,
  name text,
  PRIMARY KEY (id)
);

CREATE TABLE albums (
  id serial,
  artist_id int,
  title text,
  release_date date,
  type text,
  a_stream_link text,
  s_stream_link text,
  album_art text,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id serial,
  email text,
  name text,
  password text,
  salt text,
  PRIMARY KEY (id)
);

CREATE TABLE albums_users (
  id serial,
  album_id int,
  user_id int,
  listened boolean,
  PRIMARY KEY (id)
);
