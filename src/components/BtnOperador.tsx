import { ReactNode } from 'react';

interface BtnOperadorProps {
    operador: ReactNode;
    onClick: () => void;
}

export function BtnOperador({ operador, onClick }: BtnOperadorProps) {
    return (
        <button onClick={onClick} className="bg-zinc-800 p-4 rounded-lg shadow-md hover:bg-zinc-600 transition duration-200 ease-in-out text-white">
            {operador}
        </button>
    )
}