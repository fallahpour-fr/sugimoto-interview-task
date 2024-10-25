/*Find all authors who have published more than 5 books*/

SELECT 
    "Authors".id,
    "Authors".name,
    "Authors".country,
    COUNT("AuthorBooks"."bookId") AS bookCount
FROM 
    "Authors"
JOIN 
    "AuthorBooks" ON "Authors".id = "AuthorBooks"."authorId" 
GROUP BY 
    "Authors".id /*گروه‌بندی بر اساس شناسه نویسندگان انجام می‌شود، به این معنی که تعداد کتاب‌ها برای هر نویسنده جداگانه محاسبه میشود*/
HAVING 
    COUNT("AuthorBooks"."bookId") > 5; /* استفاده میکنیم تا شرط اینکه کتاب هایی که بیشتر از 5 تا هستند را انتخاب کنیم  Having از  */



/*Calculate the average book price for each country, based on the authors' countries.*/

SELECT 
  "Authors".country,
  AVG("Books".price) AS average_price
FROM 
  "Authors"
JOIN 
  "AuthorBooks" ON "Authors".id = "AuthorBooks"."authorId" 
JOIN 
  "Books" ON "Books".id = "AuthorBooks"."bookId"           
GROUP BY 
  "Authors".country; /*گروه بندی براساس کشور انجام میشود و میانگیم قیمت را محاسبه میکند*/

/*Retrieve a list of books that includes author names, sorted by price in descending order, and filterable by a specific year of publication.*/

SELECT 
    "Books".id,
    "Books".title,
    "Books".price,
    "Books".publish_date,
    "Authors".name AS author_name
FROM 
    "Books"
JOIN 
    "AuthorBooks" ON "Books".id = "AuthorBooks".bookId
JOIN 
    "Authors" ON Authors.id = "AuthorBooks".authorId 
WHERE 
    "Books".publish_date BETWEEN '2023-01-01' AND '2023-12-31' /*شرط میکنه کتاب هایی رو بدست بیاره که تاریخ انتشارشون بین این دو تاریخ باشه*/
ORDER BY 
    "Books".price DESC; /*نتیجه رو براساس ستون جدول قیمت مرتب میکند*/
