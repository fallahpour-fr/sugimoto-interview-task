const {Book,Author}=require('../models/index');

module.exports = {
    getBooks: async (req, res, next) => {
        try {
          const { author_id, page = 1, limit = 10, sort = 'ASC' } = req.query;
          const offset = (page - 1) * limit;
      
          const where = {};
      
          const result = await Book.findAndCountAll({
            include: [
              {
                model: Author,
                through: { attributes: [] }, // Exclude pivot table attributes
                where: author_id ? { id: author_id } : {} // Filter by author if provided
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
      }
      
}