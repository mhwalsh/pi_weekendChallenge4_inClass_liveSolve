create table todos (
	id SERIAL,
	complete boolean,
	name varchar(200),
	description varchar(200)
);

insert into todos (complete, name, description) values (false, 'test', 'test');

insert into todos (complete, name, description) values (false, 'taskone', 'do it one');
insert into todos (complete, name, description) values (false, 'tasktwo', 'do it two');
insert into todos (complete, name, description) values (false, 'taskthree', 'do it three');
