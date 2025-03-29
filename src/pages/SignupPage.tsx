import { Link } from "react-router-dom";

export default function SignupPage() {
    return (
        <div 
            className="w-full min-h-screen flex items-center justify-center bg-cover bg-center relative" 
            style={{ backgroundImage: "url('https://img.freepik.com/free-vector/musical-pentagram-sound-waves-notes-background_1017-33911.jpg')" }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Signup Card */}
            <div className="relative z-10 w-full max-w-md p-6 bg-gray-900 bg-opacity-95 text-white rounded-lg shadow-lg">
                
                {/* Brand Logo */}
                <div className="flex justify-center mb-4">
                    <Link to="/" className="flex items-center gap-1 text-white">
                        <span className="text-2xl md:text-3xl font-semibold"><i className="bi bi-music-note-list"></i></span>
                        <span className="md:text-xl font-semibold">Smoothie</span>
                    </Link>
                </div>

                <h3 className="text-2xl font-bold text-center mb-4">Signup, and Feel Smoothie</h3>

                {/* Signup Form */}
                <form className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold">Name</label>
                        <input type="text" className="w-full p-2.5 bg-gray-800 text-white border rounded-md focus:ring-2 focus:ring-green-500" placeholder="Raghuwansi Ram" />
                    </div>

                    <div>
                        <label className="text-sm font-semibold">Email</label>
                        <input type="email" className="w-full p-2.5 bg-gray-800 text-white border rounded-md focus:ring-2 focus:ring-green-500" placeholder="name@domain.com" />
                    </div>

                    <div>
                        <label className="text-sm font-semibold">Password</label>
                        <input type="password" className="w-full p-2.5 bg-gray-800 text-white border rounded-md focus:ring-2 focus:ring-green-500" placeholder="******" />
                    </div>

                    <button type="button" className="w-full py-3 bg-green-500 text-black font-medium rounded-full hover:bg-green-600 transition transform hover:scale-105">Sign Up</button>
                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-400 mt-4">
                    Already have an account? <Link to="/login" className="text-green-400 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}
