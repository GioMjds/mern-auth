import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function HomePage() {
    const { user, logout, loading } = useAuth(); // Include loading state

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <p>Loading user data...</p> {/* Simple loading indicator */}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6">Welcome {user?.email || 'Guest'}</h1> {/* Fallback to 'Guest' if no user */}
                {user && ( // Conditionally render logout and protected page link if user is logged in
                    <>
                        <button
                            onClick={logout}
                            className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
                        >
                            Logout
                        </button>
                        <Link
                            to="/protected"
                            className="ml-4 bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
                        >
                            Go to Protected Page
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}