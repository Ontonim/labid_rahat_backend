import { Router } from "express"
import { UserRoutes } from "../app/modules/user/user.route"
import { AuthRoutes } from "../app/modules/auth/auth.route"
import { TaskRoutes } from "../app/modules/task/task.route"
import { ContentRequestRoutes } from "../app/modules/contentRequest/contentReq.route"
import { UpcomingVideoRoutes } from "../app/modules/upCommingVideo/upCommingVideo.route"
import { BlogRoutes } from "../app/modules/blogs/blog.route"
import { VideoRoutes } from "../app/modules/video/video.route"


export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
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
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})
