const articleService = require("./articles.service");

class ArticleController {
    /**
     * Create a new article
     */
    async create(req, res, next) {
        try {
            const userId = req.user._id;
            req.body.user = userId;
            const article = await articleService.create(req.body);
            req.io.emit("article:create", article);
            res.status(201).json(article);
        } catch (err) {
            next(err);
        }
    }

    /**
     *  update an article
     */
    async update(req, res, next) {
        try {
            const id = req.params.id;
            const data = req.body;
            const articleModified = await articleService.update(id, data);
            req.io.emit("article:update", articleModified);
            res.json(articleModified);
        } catch (err) {
            next(err);
        }
    }

    /**
     * delete an article
     */
    async delete(req, res, next) {
        try {
            const id = req.params.id;
            await articleService.delete(id);
            req.io.emit("article:delete", { id });
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ArticleController();