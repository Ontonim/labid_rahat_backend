import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { AuthRoutes } from "../modules/auth/auth.route"
import { TaskRoutes } from "../modules/task/task.route"
import { ContentRequestRoutes } from "../modules/contentRequest/contentReq.route"


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
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})
