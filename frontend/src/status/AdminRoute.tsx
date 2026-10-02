import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const AdminRoute = ({ children }: { children: ReactNode }) => {
    const { user } = useSelector((state: RootState) => state.user);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user?.role !== "ADMIN") {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default AdminRoute;