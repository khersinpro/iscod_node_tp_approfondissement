const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const User = require("../api/users/users.model");
const Article = require("../api/articles/articles.model");
const usersService = require("../api/users/users.service");

describe('tests for articles API', () => {
    let token;
    const USER_ID = "fake";
    const MOCK_USER = {
        _id: USER_ID,
        name: "ana",
        email: "mock@gmail.com",
        password: "azertyuiop",
        role: "admin"
    };

    const MOCK_ARTICLE_CREATED = {
        title: "test",
        content: "test",
        state: "published"
    }

    const MOCK_ARTICLE = {
        _id: "64fc7c0ee3f3aed18a3b8923",
        title: "titre modifié dans le test",
        content: "test",
        state: "draft"
    }

  
    beforeEach(() => {
      token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
      mockingoose(User).toReturn(MOCK_USER, "findOne");// findone is findById
      mockingoose(Article).toReturn(MOCK_ARTICLE_CREATED, "save");
      mockingoose(Article).toReturn(MOCK_ARTICLE, "findOneAndUpdate");
      mockingoose(Article).toReturn({}, "deleteOne");
    });

    test("[Articles] create one", async () => {
        const res = await request(app)
        .post("/api/articles")
        .set("x-access-token", token)
        .send(MOCK_ARTICLE_CREATED)

        expect(res.status).toBe(201);
        expect(res.body.title).toBe(MOCK_ARTICLE_CREATED.title);
        expect(res.body.content).toBe(MOCK_ARTICLE_CREATED.content);
        expect(res.body.state).toBe(MOCK_ARTICLE_CREATED.state);
    })

    test("[Articles] update one", async () => {
        const res = await request(app)
        .put("/api/articles/64fc7c0ee3f3aed18a3b8923")
        .set("x-access-token", token)
        .send({
            title: "titre modifié dans le test"
        })

        expect(res.status).toBe(200);
        expect(res.body.title).toBe("titre modifié dans le test");
    })

    test("[Articles] delete one", async () => {
        const res = await request(app)
        .delete("/api/articles/64fc7c0ee3f3aed18a3b8923")
        .set("x-access-token", token)

        expect(res.status).toBe(204);
    })

    afterEach(() => {
      jest.restoreAllMocks();
    });
})