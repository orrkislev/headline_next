export default function PopUpCleaner({ open, close }) {
    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 z-[100] ${open ? 'block' : 'hidden'}`}
            onClick={close} />
    )
}