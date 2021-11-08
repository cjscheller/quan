create table categories(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
    title varchar(255)
);

insert into categories (id, title) values (1, "Uncategorized");
insert into categories (id, title) values (2, "Auto");
insert into categories (id, title) values (3, "Donations");
insert into categories (id, title) values (4, "Recreation");
insert into categories (id, title) values (5, "Groceries");
insert into categories (id, title) values (6, "Health");
insert into categories (id, title) values (7, "Services");
insert into categories (id, title) values (8, "Rent");
insert into categories (id, title) values (9, "Dining");
insert into categories (id, title) values (10, "Transportation");
insert into categories (id, title) values (11, "Shopping");
insert into categories (id, title) values (12, "Travel");


create table accounts
(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    title VARCHAR(255),
    linked_account_id VARCHAR(255), 
    active UNSIGNED INTEGER
);

create table transactions
(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    linked_transaction_id VARCHAR(64), 
    account UNSIGNED INTEGER NOT NULL,
    category UNSIGNED INTEGER NOT NULL,
    description VARCHAR(255),
    original_desc VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    hidden BOOLEAN NOT NULL CHECK (hidden IN (0, 1)) DEFAULT 0,
    date DATE NOT NULL,
    FOREIGN KEY (account) REFERENCES "accounts" (id) ON DELETE CASCADE, 
    FOREIGN KEY (category) REFERENCES "categories" (id) ON DELETE CASCADE
);