export default function IconButton({ children, ...props }) {
    return (
        <button {...props} className='flex items-center justify-center p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-400 transition-all' aria-label={props['aria-label'] || 'icon button'}>
            {children}
        </button>
    );
}