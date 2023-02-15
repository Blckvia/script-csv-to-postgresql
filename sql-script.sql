DROP TABLE IF EXISTS user_info;

CREATE TABLE user_info(
	id serial PRIMARY KEY,
	Ник varchar(68) NOT NULL,
	Email varchar(68) NOT NULL,
	Зарегестрирован timestamp NOT NULL,
	Статус varchar(30) NOT NULL
);

