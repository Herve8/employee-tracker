USE employeeManagment;

INSERT INTO department(name)
VALUES ("IT");

INSERT INTO department(name)
VALUES ("Accounts");

INSERT INTO department(name)
VALUES ("Sales");

INSERT INTO department(name)
VALUES ("Human Resources");


-- IT Department - id1
INSERT INTO emprole (title, salary, department_id)
VALUES ('Network Engineer', 80000, 1);
-- IT Department 
INSERT INTO emprole (title, salary, department_id)
VALUES ('Full Stack Developer', 75000, 1);
-- IT Department 
INSERT INTO emprole (title, salary, department_id)
VALUES ('Helpdesk', 60000, 1);
-- IT Department 
INSERT INTO emprole (title, salary, department_id)
VALUES ('Software Engineer', 80000, 1);

-- Accounts Department - id2
INSERT INTO emprole (title, salary, department_id)
VALUES ('Account Manager', 130000, 2);
-- Accounts Department 
INSERT INTO emprole (title, salary, department_id)
VALUES ('Account Officer', 70000, 2);
-- Accounts Department 
INSERT INTO emprole (title, salary, department_id)
VALUES ('Payroll', 75000, 2);
-- Accounts Department 
INSERT INTO emprole (title, salary, department_id)
VALUES ('Bookeeping', 70000, 2);


-- Sales Department - id3
INSERT INTO emprole (title, salary, department_id)
VALUES ('Sales Manager', 80000, 3);
-- Sales Department 
INSERT INTO emprole (title, salary, department_id)
VALUES ('Sales Representative', 75000, 3);
-- Sales Department 
INSERT INTO emprole (title, salary, department_id)
VALUES ('Sales Support', 65000, 3);


-- Human Resources Department - id4
INSERT INTO emprole (title, salary, department_id)
VALUES ('Human Resources Manager', 90000, 4);
-- Human Resources Department 
INSERT INTO emprole (title, salary, department_id)
VALUES ('Secretary', 70000, 4);
-- Human Resources Department 
INSERT INTO emprole (title, salary, department_id)
VALUES ('Training and Development Officer', 75000, 4);


--  IT staff -id1
INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- GheorgheHagi - Network Engineer - IT Department 
VALUES ('Gheorghe', 'Hagi', 1, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- Lionel Messi- Full Stack Developer - IT Department 
VALUES ('Lionel', 'Messi', 2 ,1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- Roberto Carlos - Helpdesk - IT Department 
VALUES ('Roberto', 'Carlos', 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- Hatem Ben Arfa- Software Engineer - IT Department 
VALUES ('Hatem', 'Ben Arfa', 4, null);

-- Accountting staff -id2
INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- Michelle Rodriguez - Accounts Manager - Accounts Department 
VALUES ('Michelle', 'Rodriguez', 5, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- Jenna Brown - Accounts Officer - Accounts Department 
VALUES ('Jenna', 'Brown', 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- Alpha Blondy - Payroll - Accounts Department 
VALUES ('Alpha', 'Blondy', 7, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- Tania St Val - Bookkeeping - Accounts Department 
VALUES ('Tania', 'St Val', 8, 3);


-- Sales staff 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- Tony Cascarino - Sales Manager - Sales Department 
VALUES ('Tony', 'Cascarino', 9, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- Marta da Silva - Sales Representative - Sales Department 
VALUES ('Marta', 'da Silva', 10, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- Sylvia Cedia - Sales Supportl - Sales Department 
VALUES ('Sylvia', 'Cedia', 11, 1);

--- Human Resources staff 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- Monique Seka - Human Resources Manager Manager - Human Resources Department 
VALUES ('Monique', 'Seka', 12, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- Rita Marley - Secretary - Accounts Department 
VALUES ('Rita', 'Marley', 13, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- Lauryn Hill - Training and Developement Officerl - Accounts Department 
VALUES ('Lauryn', 'Hill', 14, 3);