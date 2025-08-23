export default function PopUpCleaner({ open, close }) {
    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 z-[1000] ${open ? 'block' : 'hidden'}`}
            onClick={close} />
    )
}