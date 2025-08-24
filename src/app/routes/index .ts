import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { AuthRoutes } from "../modules/auth/auth.route"
import { TaskRoutes } from "../modules/task/task.route"
import { ContentRequestRoutes } from "../modules/contentRequest/contentReq.route"
import { UpcomingVideoRoutes } from "../modules/upCommingVideo/upCommingVideo.route"
import { BlogRoutes } from "../modules/blogs/blog.route"


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
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})
