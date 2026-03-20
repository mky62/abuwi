"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function PitchSection() {
    const router = useRouter();

    const handleCreateRoute = () => {

        router.push("/p/create");

    }

    return (
        <div className='w-full h-full'>
            <div className='w-full h-full overflow-y-auto'>
                <div className="h-12 items-center justify-between flex bg-blue-500">
                    <p>Pitch Section</p>
                    <Button
                        type="button"
                        onClick={handleCreateRoute}
                        className="shrink-0"
                        aria-label="Create Pitch">
                        Create Pitch
                    </Button>
                </div>
            </div>
        </div>
    )
}