import { photosApi } from "../rtkmodules/photos/photosServices";
import { profileApi } from "../rtkmodules/profile/profileServices";
import { RecommendedUsersApi } from "../rtkmodules/home/RecommededUsers";
import { UsersListServicesApi } from "../rtkmodules/messages/UsersListServices";
import { userActionsApi } from "../rtkmodules/user actions/userActionServices";

const rootMiddleware = [
    photosApi.middleware,
    profileApi.middleware,
    RecommendedUsersApi.middleware,
    UsersListServicesApi.middleware,
    userActionsApi.middleware
]

export default rootMiddleware;