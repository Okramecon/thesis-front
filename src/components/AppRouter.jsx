import React from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/Routes";
import DepartmentCard from "./DepartmentCard";

const AppRouter = () => {

    return (
        <Routes>         
            {publicRoutes.map(route => {
                return (<Route
                    key={route.path}
                    exact={route.exact}
                    path={route.path}
                    element={route.element}
                />)
            })}
            <Route path="*" element={<DepartmentCard/>}/>
        </Routes>
    );
};

export default AppRouter;