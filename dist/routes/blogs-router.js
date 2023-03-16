"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blog_repository_1 = require("../repositories/blog-repository");
const blogs_validation_middleware_1 = require("../validation/blogs-validation-middleware");
const authorization_1 = require("../validation/authorization");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => {
    const blogs = blog_repository_1.blogRepository.findBlogs();
    res.send(blogs);
});
exports.blogsRouter.get('/:id', (req, res) => {
    let foundBlog = blog_repository_1.blogRepository.findBlogById(+req.params.id);
    if (foundBlog) {
        res.send(foundBlog);
        return;
    }
    res.sendStatus(404);
});
exports.blogsRouter.delete('/:id', authorization_1.basicAuthMiddleware, (req, res) => {
    const isDeleted = blog_repository_1.blogRepository.deleteBlog(+req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else
        res.sendStatus(404);
});
exports.blogsRouter.post('/', blogs_validation_middleware_1.nameBlogMiddleware, blogs_validation_middleware_1.descriptionBlogMiddleware, blogs_validation_middleware_1.websiteUrlBlogMiddleware, blogs_validation_middleware_1.errorsBlogMiddleware, authorization_1.basicAuthMiddleware, (req, res) => {
    const newBlog = blog_repository_1.blogRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).send(newBlog);
});
exports.blogsRouter.put('/:id', blogs_validation_middleware_1.nameBlogMiddleware, blogs_validation_middleware_1.descriptionBlogMiddleware, blogs_validation_middleware_1.websiteUrlBlogMiddleware, blogs_validation_middleware_1.errorsBlogMiddleware, authorization_1.basicAuthMiddleware, (req, res) => {
    let foundBlog = blog_repository_1.blogRepository.updateBlog(+req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (foundBlog) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
