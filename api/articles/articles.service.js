const Article = require('./articles.model');

class ArticleService {
    /**
     * Create a new article
     * @param {Object} data 
     * @returns {Promise}
     */
    create(data) {
        const article = new Article(data);
        return article.save();
    }

    /**
     *  update an article
     * @param {String} id
     * @param {Object} data
     * @returns {Promise}
     */
    update(id, data) {
        return Article.findByIdAndUpdate(id , data, { new: true });
    }

    /**
     * delete an article
     * @param {String} id
     * @returns {Promise}
     */
    delete(id) {
        return Article.deleteOne({ _id: id });
    }

    /**
     * Get all articles from user
     * @returns {Promise}
     */
    getAllFromUser(userId) {
        return Article.find({ user: userId }).populate('user', '-password');
    }
}

module.exports = new ArticleService();