import { useAuth } from "../contexts/AuthContext";

export default function ProtectedPage() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6">Protected Page</h1>
                <p className="text-lg">Hello {user?.email}! You are authorized.</p>
            </div>
        </div>
    );
}