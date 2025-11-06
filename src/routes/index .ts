import { Router } from "express"
import { UserRoutes } from "../app/modules/user/user.route"
import { AuthRoutes } from "../app/modules/auth/auth.route"
import { TaskRoutes } from "../app/modules/task/task.route"
import { ContentRequestRoutes } from "../app/modules/contentRequest/contentReq.route"
import { UpcomingVideoRoutes } from "../app/modules/upCommingVideo/upCommingVideo.route"
import { VideoRoutes } from "../app/modules/video/video.route"
import { CommentRoutes } from "../app/modules/comment/comment.route"
import { BlogRoutes } from "../app/modules/blogs/blog.route"
import { NewsletterRoutes } from "../app/modules/newslatter/newslatter.route"
import { ContactRoutes } from "../app/modules/contactMessage/contactMessage.route"
import { DashboardRoutes } from "../app/modules/dashboardOverview/dashboardOverview.route"


export const router = Router()

const moduleRoutes = [
    {
        path: "/members",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
       {
        path: "/tasks",
        route: TaskRoutes
    },
    {
        path: "/contentRequest",
        route: ContentRequestRoutes
    },
    {
        path: "/upcomingVideos",
        route: UpcomingVideoRoutes
    },
    {
        path: "/blogs",
        route: BlogRoutes
    },
    {
        path: "/videos",
        route: VideoRoutes
    },
    {
        path: "/comments",
        route: CommentRoutes
    },
    {
        path: "/newsletter",
        route: NewsletterRoutes
    },
    {
        path: "/contact",
        route: ContactRoutes
    },
    {
        path: "/dashboard-overview",
        route: DashboardRoutes
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})
