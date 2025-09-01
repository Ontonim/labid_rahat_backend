"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../app/modules/user/user.route");
const auth_route_1 = require("../app/modules/auth/auth.route");
const task_route_1 = require("../app/modules/task/task.route");
const contentReq_route_1 = require("../app/modules/contentRequest/contentReq.route");
const upCommingVideo_route_1 = require("../app/modules/upCommingVideo/upCommingVideo.route");
const blog_route_1 = require("../app/modules/blogs/blog.route");
const video_route_1 = require("../app/modules/video/video.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes
    },
    {
        path: "/tasks",
        route: task_route_1.TaskRoutes
    },
    {
        path: "/contentRequest",
        route: contentReq_route_1.ContentRequestRoutes
    },
    {
        path: "/upcomingVideos",
        route: upCommingVideo_route_1.UpcomingVideoRoutes
    },
    {
        path: "/blogs",
        route: blog_route_1.BlogRoutes
    },
    {
        path: "/videos",
        route: video_route_1.VideoRoutes
    }
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
