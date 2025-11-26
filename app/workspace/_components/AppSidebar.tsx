"use client"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { UserDetailContext } from "@/context/UserDetailContext"
import { useAuth, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Shield } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function AppSidebar() {
    const [projectList, setProjectList] = useState<any>([]);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [loading, setLoading] = useState(true);
    const { has } = useAuth()
    useEffect(() => {
        GetProjectList();
    }, [])

    const hasUnlimitedAccess = has && has({ plan: 'unlimited' })

    const GetProjectList = async () => {
        setLoading(true);
        const result = await axios.get('/api/get-all-projects')
        setProjectList(result.data)
        console.log(result.data)
        setLoading(false);
    }

    return (
        <Sidebar className="p-2">
            <SidebarHeader className="p-2" />
            <div className="flex items-center gap-2"><Image src={'/logo.svg'} alt='logo' width={35} height={35} />
                <h2 className="font-bold">Ai Website Generator</h2>
            </div>
            <Link href={'/workspace'} className="mt-5 w-full"><Button className="w-full">+ Add New Project</Button></Link>
            <SidebarContent className="p-2">
                <SidebarGroup />
                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                {loading ? (
                    <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((item, index) => (
                            <Skeleton key={index} className="h-10 w-full rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <>
                        {projectList.length == 0 && <h2 className="text-sm px-2 text-gray-500">No projects found</h2>}
                        <div className="flex flex-col gap-2">
                            {projectList.map((project: any, index: number) => (
                                <Link href={`/playground/${project.projectId}?frameId=${project.frameId}`} key={index} className="p-2 flex gap-2 items-center hover:bg-gray-100 rounded-lg">
                                    <h2 className="line-clamp-1">
                                        {project?.message?.[0]?.content || "Untitled Project"}
                                    </h2>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter className="p-2">
                {!hasUnlimitedAccess && <div className="p-3 border rounded-xl space-y-3 bg-secondary">
                    <h2 className="flex justify-between items-center">Remaining Credit <span className="font-bold">{userDetail?.credits}</span></h2>
                    <Progress value={(userDetail?.credits / 2) * 100} />
                    <Link href={'/workspace/pricing'} className="w-full ">
                        <Button className="w-full">Upgrade to Unlimted</Button>
                    </Link>
                </div>}
                <div className="flex items-center gap-2">
                    <UserButton />
                    <Button variant={'ghost'}>Settings</Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}