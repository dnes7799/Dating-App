import { Route, Routes } from "react-router-dom";

import PublicLayout from "../layout/public/PublicLayout";
import { authRoutes, publicRoutes } from "./publicRoutes";
import ComingSoon from "../components/public/Coming Soon/ComingSoon";
import PrivateLayout from "../layout/private/PrivateLayout";
import { privateRoutes } from "./privateRoutes";
const MainRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                {
                    publicRoutes.map((route, index) => {
                        return <Route key={index} path={route.path} element={route.component} />
                    })
                }/
            </Route>
            <Route element={<PrivateLayout />}>
                {
                    privateRoutes.map((route, index) => {
                        return <Route key={route.path} path={route.path} element={route.component} />
                    })
                }
            </Route>

            {authRoutes.map((route, index) => {

                return <Route key={index} path={route.path} element={route.component} />

            })}

            <Route path="*" element={<ComingSoon />} />
        </Routes>
    )
}

export default MainRoutes;