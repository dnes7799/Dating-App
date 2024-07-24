import { combineReducers } from "@reduxjs/toolkit";

import globalReducer from "../state"
import profileReducer from '../reducers/updateProfileSlice'
import messageReducer from '../reducers/messageSlice'
import profileFilterReducer from "../reducers/profileFilterSlice";

import { photosApi } from "../rtkmodules/photos/photosServices";
import { profileApi } from "../rtkmodules/profile/profileServices";
import { RecommendedUsersApi } from "../rtkmodules/home/RecommededUsers";
import { UsersListServicesApi } from "../rtkmodules/messages/UsersListServices";
import { userActionsApi } from "../rtkmodules/user actions/userActionServices";

const rootReducer = combineReducers({
    global: globalReducer,
    profile: profileReducer,
    message: messageReducer,
    profileFilter : profileFilterReducer,
    [photosApi.reducerPath]: photosApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer ,
    [RecommendedUsersApi.reducerPath] : RecommendedUsersApi.reducer , 
    [UsersListServicesApi.reducerPath] : UsersListServicesApi.reducer,
    [userActionsApi.reducerPath] : userActionsApi.reducer

})

export default rootReducer;