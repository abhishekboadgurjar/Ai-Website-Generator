import { PricingTable } from '@clerk/nextjs'

export default function Pricing() {
    return (
        <div className='flex flex-col items-center justify-center max-w-3xl w-full mx-auto h-[70%]'>
            <h2 className='text-3xl font-bold  mb-4'>Pricing</h2>
            <PricingTable />
        </div>
    )
}