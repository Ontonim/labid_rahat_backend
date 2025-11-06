"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../app/modules/user/user.route");
const auth_route_1 = require("../app/modules/auth/auth.route");
const task_route_1 = require("../app/modules/task/task.route");
const contentReq_route_1 = require("../app/modules/contentRequest/contentReq.route");
const upCommingVideo_route_1 = require("../app/modules/upCommingVideo/upCommingVideo.route");
const video_route_1 = require("../app/modules/video/video.route");
const comment_route_1 = require("../app/modules/comment/comment.route");
const blog_route_1 = require("../app/modules/blogs/blog.route");
const newslatter_route_1 = require("../app/modules/newslatter/newslatter.route");
const contactMessage_route_1 = require("../app/modules/contactMessage/contactMessage.route");
const dashboardOverview_route_1 = require("../app/modules/dashboardOverview/dashboardOverview.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/members",
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
    },
    {
        path: "/comments",
        route: comment_route_1.CommentRoutes
    },
    {
        path: "/newsletter",
        route: newslatter_route_1.NewsletterRoutes
    },
    {
        path: "/contact",
        route: contactMessage_route_1.ContactRoutes
    },
    {
        path: "/dashboard-overview",
        route: dashboardOverview_route_1.DashboardRoutes
    }
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
