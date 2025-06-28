export default function Loader() {
    return (
        <div className="absolute w-full h-full flex flex-col items-center justify-center bg-white">
            <div className="relative mb-2">
                {/* Circular loader ring */}
                <div className="w-24 h-24 border-2 border-gray-200 border-t-gray-300 rounded-full animate-spin shadow-lg"></div>
                {/* Logo in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                        src="/logo-head.png" 
                        alt="Loading..." 
                        className="w-16 h-16 object-contain"
                    />
                </div>
            </div>
            {/* "The Hear" text */}
            {/* <h1 className="text-sm font-medium text-gray-700 font-['Geist']">The Hear</h1> */}
        </div>
    );
} 