import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
    const { isAuthenticated, logout, loading } = useAuth(); // Include loading state

    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    MERN Auth
                </Link>
                <div className="space-x-4">
                    {loading ? (
                        <span>Loading...</span> // Optional: Loading indicator in navbar
                    ) : !isAuthenticated ? (
                        <>
                            <Link to="/login" className="hover:text-blue-200">
                                Login
                            </Link>
                            <Link to="/register" className="hover:text-blue-200">
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={logout}
                            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    )}
                    <Link to="/protected" className="hover:text-blue-200">
                        Protected
                    </Link>
                </div>
            </div>
        </nav>
    );
}