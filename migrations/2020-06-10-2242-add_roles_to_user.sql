ALTER TABLE "User"
ADD COLUMN admin BOOLEAN DEFAULT false;

CREATE TABLE "Roles" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "userId" integer NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User"(id)
);
