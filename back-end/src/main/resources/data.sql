INSERT INTO USERS (username, password, role)
VALUES (
        'admin',
        '$2a$10$GiseHkdvwOFr7A9KRWbeiOmg/PYPhWVjdm42puLfOzR/gIAQrsAGy',
        'ADMIN'
       )
;

INSERT INTO USERS (username, password, role)
VALUES
    ('admin', '$2a$10$qy2lpi28GaWDP15tKU81dO0rB1kPsVkR7r7P7ltI.9d4HGgTCFm9W', 'ADMIN'),
    ('operator', '$2a$10$qy2lpi28GaWDP15tKU81dO0rB1kPsVkR7r7P7ltI.9d4HGgTCFm9W', 'OPERATOR'),
    ('client', '$2a$10$qy2lpi28GaWDP15tKU81dO0rB1kPsVkR7r7P7ltI.9d4HGgTCFm9W', 'CLIENT')
;