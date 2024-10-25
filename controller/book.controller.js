const {Book,Author}=require('../models/index');
const jwt = require('jsonwebtoken');
const { Op } = Sequelize;

module.exports = {
    getBooks: async (req, res, next) => {
        try {
          const { author_id, page = 1, limit = 10, sort = 'ASC' } = req.query;
          const offset = (page - 1) * limit;

          if(req.user.id !== Number(author_id)){
            return res.status(400).json({ message: 'access denied for user' });
          }
      
          const result = await Book.findAndCountAll({
            include: [
              {
                model: Author,
                through: { attributes: [] }, 
                where: author_id ? { id: author_id } : {} 
              }
            ],
            order: [['publish_date', sort.toUpperCase()]],
            limit: parseInt(limit),
            offset: parseInt(offset)
          });
      
          const totalPages = Math.ceil(result.count / limit);
          res.status(200).json({
            data: result.rows,
            currentPage: parseInt(page),
            totalPages: totalPages,
            totalItems: result.count
          });
        } catch (error) {
          console.error(error);
          res.status(500).send('Server error');
        }
      },

      createBooks: async (req, res, next) => {
        try {
          const { name, country } = req.body;

          const existingAuthor = await Author.findOne({ where: { name } });
          if (existingAuthor) {
              return res.status(400).json({ message: 'name already in use' });
          }


          const author=await Author.create({name, country});

        const token = jwt.sign({ id: author.id, name: author.name }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        res.status(201).json({
            message: "User add successfuly",
            user: {
                id: author.id,
                name: author.name,
                token: token
            }
        });

        } catch (error) {
          console.error(error);
          res.status(500).send('Server error');
        }
      },

      findMoreThanFiveBook: async (req, res, next) => {
        try {
          const authors = await Author.findAll({
            include: [
              {
                model: Book,
                attributes: [], 
                through: { attributes: [] }, 
              }
            ],
            attributes: {
              include: [
                [
                  Sequelize.fn('COUNT', Sequelize.col('Books.id')), 
                  'bookCount' 
                ]
              ]
            },
            group: ['Author.id'],
            having: Sequelize.literal('COUNT("Books"."id") > 5'), 
          });
      
          return authors;
        } catch (error) {
          console.error('Error fetching authors:', error);
          throw error;
        }
      },

      getAverageBookPriceByCountry: async (req, res, next) =>  {
        try {
          const result = await Author.findAll({
            attributes: [
              'country',
              [Sequelize.fn('AVG', Sequelize.col('Books.price')), 'average_price']
            ],
            include: [
              {
                model: Book,
                attributes: [],
                through: { attributes: [] }
              }
            ],
            group: ['country']
          });
      
          console.log(result);
          return result;
        } catch (error) {
          console.error('Error fetching average book price by country:', error);
          throw error;
        }
      },

      getBooksByYearAndSortedByPrice : async (req, res, next) => {
        const {year}=req.year;
        try {
          const books = await Book.findAll({
            include: [
              {
                model: Author,
                attributes: ['name'], 
                through: { attributes: [] } 
              }
            ],
            where: year
              ? {
                  publish_date: {
                    [Op.between]: [
                      `${year}-01-01`,
                      `${year}-12-31`
                    ]
                  }
                }
              : {}, 
            order: [['price', 'DESC']], 
          });
      
          return books;
        } catch (error) {
          console.error('Error fetching books:', error);
          throw error;
        }
      }
      
}