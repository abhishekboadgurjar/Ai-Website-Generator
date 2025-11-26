import { Button } from '@/components/ui/button'
import { OnSaveContext } from '@/context/OnSaveContext';
import { Code, Download, Monitor } from 'lucide-react';
import Image from 'next/image'
import React, { useContext } from 'react'

type Props = {
    onDownload: () => void;
    onViewCode: () => void;
    onFullScreen: () => void;
}

function PlaygroundHeader({ onDownload, onViewCode, onFullScreen }: Props) {

    const { onSaveData, setOnSaveData } = useContext(OnSaveContext);
    return (
        <div className='flex items-center justify-between p-4 shadow'>
            <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
            <div className='flex gap-2'>
                <Button className='ghost' variant="ghost" onClick={onViewCode}> <Code /> View Code</Button>
                <Button className='ghost' variant="ghost" onClick={onFullScreen}> <Monitor /> Full Screen</Button>
                <Button className='ghost' variant="ghost" onClick={onDownload}> <Download /> Download</Button>
                <Button onClick={() => setOnSaveData(Date.now())}>Save</Button>
            </div>
        </div>
    )
}
export default PlaygroundHeader