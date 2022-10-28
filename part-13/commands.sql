CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0
);

INSERT INTO blogs (author, url, title) 
VALUES (
    'John Smith', 
    'http://example.com/johnsmith/myblog',
    'My Blog'
);

INSERT INTO blogs (author, url, title, likes) 
VALUES (
    'Bruce Wayne', 
    'http://example.com/brucewayne/batman',
    'Batman Blog',
    1872
);