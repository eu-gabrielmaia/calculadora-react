export default function TeclaNumerica({ numero, onClick }: { numero: string; onClick: () => void }) {
    return (
        <button onClick={onClick} className="bg-zinc-300 w-15 h-15 rounded-full hover:bg-zinc-500 transition duration-200 ease-in-out text-red-900 font-semibold text-2xl flex justify-center items-center m-1">
            {numero}
        </button>
    )
}