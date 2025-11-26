"use client"
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const MenuOptions = [
    {
        name: 'Pricing',
        path: '/workspace/pricing'
    },
    {
        name: 'Contact us',
        path: '/contact'
    },

]


function Header() {
    const { user } = useUser();
    return (
        <div className='flex items-center justify-between p-4 shadow'>
            <div className='flex items-center gap-2'>
                <Image src={'/logo.svg'} alt='logo' width={35} height={35} />
                <h2 className='font-bold text-xl'>Ai Website Generator</h2>
            </div>
            <div className='flex gap-3'>
                {MenuOptions.map((menu, index) => (
                    <Link href={menu.path} key={index}>
                        <Button variant={'ghost'} >{menu.name}</Button>
                    </Link>
                ))}
            </div>
            <div>
                {!user ? <SignInButton mode='modal' fallbackRedirectUrl={'/workspace'}>
                    <Button>Get Started <ArrowRight /></Button>
                </SignInButton> :
                    <Link href={'/workspace'}><Button>Dashboard</Button ></Link>
                }
            </div>

        </div>
    )
}

export default Header