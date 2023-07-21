import Image from 'next/image'

export default function TargetHit() {
    return (
        <div className="flex">
            <div>
                <Image
                    width={400}
                    height={400}
                    src='/target-purple.png'
                    alt='target-image'
                />
            </div>
            <div
                className='flex items-center w-1/2 ml-[30vh]'>
                <h1
                    className='text-7xl font-bold text-center'>
                    Escolha Seed e acerte no alvo
                </h1>  
            </div>
        </div>
    )
}