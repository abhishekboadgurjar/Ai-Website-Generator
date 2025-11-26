
"use client"
import React, { useEffect, useState, useContext } from 'react'
import PlaygroundHeader from '../_components/PlaygroundHeader'
import ChatSection from '../_components/ChatSection'
import WebsiteDesign from '../_components/WebsiteDesign'
import { useParams, useSearchParams } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import { OnSaveContext } from '@/context/OnSaveContext'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export type Frame = {
    id: string;
    frameId: string;
    designCode: string;
    chatMessages: Messages[]
}

export type Messages = {
    role: string;
    content: string;
}

const Prompt = `
userInput: {userInput}

Instructions:

1. If the user input is explicitly asking to generate code, design, or HTML/CSS/JS output (e.g., "Create a landing page", "Build a dashboard", "Generate HTML Tailwind CSS code"), then:

   - Generate a complete HTML Tailwind CSS code using Flowbite UI components.
   - Use a modern design with **blue as the primary color theme**.
   - Only include the <body> content (do not add <head> or <title>).
   - Make it fully responsive for all screen sizes.
   - All primary components must match the theme color.
   - Add proper padding and margin for each element.
   - Components should be independent; do not connect them.
   - Use placeholders for all images:
        - Light mode: https://community.softr.io/uploads/db9110/original/2X/7/746e67e382d0ff5d7773ca9a87e6f6f8817a6a86.jpeg
        - Dark mode: https://www.cibaky.com/wp-content/uploads/2015/12/placeholder-3.jpg
      Add alt tag describing the image prompt.
   - Use the following libraries/components where appropriate:
        - FontAwesome icons (fa fa-)
        - Flowbite UI components: buttons, modals, forms, tables, tabs, alerts, cards, dialogs, dropdowns, accordions, etc.
        - Chart.js for charts & graphs
        - Swiper.js for sliders/carousels
        - Tippy.js for tooltips & popovers
   - Include interactive components like modals, dropdowns, and accordions.
   - Ensure proper spacing, alignment, hierarchy, and theme consistency.
   - Ensure charts are visually appealing and match the theme color.
   - Header menu options should be spread out and not connected.
   - Do not include broken links.
   - Do not add any extra text before or after the HTML code.

2. If the user input is **general text or greetings** (e.g., “Hi”, “Hello”, “How are you?”) **or does not explicitly ask to generate code**, then:

   - Respond with a simple, friendly text message instead of generating any code.

Example:

- User: "Hi" → Response: "Hello! How can I help you today?"
- User: "Build a responsive landing page with Tailwind CSS" → Response: [Generate full HTML code as per instructions above]

`

function PlayGround() {
    const { projectId } = useParams();
    const params = useSearchParams();
    const frameId = params.get('frameId');
    const [frameDetails, setFrameDetails] = useState<Frame>();
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Messages[]>([])
    const [generatedCode, setGeneratedCode] = useState<string>("")
    const { onSaveData } = useContext(OnSaveContext)


    useEffect(() => {
        if (frameId) {
            GetFrameDetails();
        }
    }, [frameId])

    const GetFrameDetails = async () => {
        const result = await fetch('/api/frames?frameId=' + frameId + "&projectId=" + projectId)
        const data = await result.json()
        setFrameDetails(data)
        const designCode = data?.designCode
        if (designCode) {
            let cleanCode = designCode;
            if (cleanCode.includes('```html')) {
                cleanCode = cleanCode.split('```html')[1];
            }
            if (cleanCode.includes('```')) {
                cleanCode = cleanCode.split('```')[0];
            }
            setGeneratedCode(cleanCode);
        }
        if (data?.chatMessages) {
            setMessages(data.chatMessages)
        }

        console.log(data)
        if (data?.chatMessages?.length == 1) {
            const userMsg = data?.chatMessages[0].content
            // Pass true to indicate this is an initial load/auto-send
            SendMessages(userMsg, true)
        }
    }

    const SendMessages = async (userInput: string, isInitial: boolean = false) => {
        setLoading(true);

        let apiMessages;

        if (!isInitial) {
            // Update UI with what user typed if it's not already there
            setMessages(prev => [...prev, { role: "user", content: userInput }]);
            apiMessages = [...messages, { role: "user", content: Prompt.replace("{userInput}", userInput) }];
        } else {
            // If initial, the message is already in the state (from GetFrameDetails)
            // And 'messages' closure might be empty, so we construct apiMessages from scratch
            apiMessages = [{ role: "user", content: Prompt.replace("{userInput}", userInput) }];
        }

        // Add placeholder for assistant response
        setMessages(prev => [...prev, { role: "assistant", content: "" }]);

        try {
            const result = await fetch('/api/ai-model', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: apiMessages }),
            });

            if (!result.body) return;

            const reader = result.body.getReader();
            const decoder = new TextDecoder();

            let aiResponse = "";
            let isCode = false;
            let chatContent = "";
            let codeContent = "";
            let lastUpdateTime = 0;
            const updateInterval = 3000; // Update every 3 seconds

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                aiResponse += chunk;

                if (!isCode && aiResponse.includes('```html')) {
                    isCode = true;
                    // Split content before the code block
                    const parts = aiResponse.split('```html');
                    chatContent = parts[0];
                    codeContent = parts[1] || ""; // Start of code

                    // Update message with just the chat part
                    setMessages(prev => {
                        const updated = [...prev];
                        const lastMsg = { ...updated[updated.length - 1] };
                        lastMsg.content = chatContent;
                        updated[updated.length - 1] = lastMsg;
                        return updated;
                    });

                    // Initial code update
                    setGeneratedCode(codeContent);
                }
                else if (isCode) {
                    // We are in code mode
                    codeContent += chunk;

                    // Check if code block ended
                    if (codeContent.includes('```')) {
                        const cleanCode = codeContent.split('```')[0];
                        setGeneratedCode(cleanCode);
                        // We don't set isCode = false here because we want to stop updating the chat message with code
                        // But we can append the completion message if it's the end
                    } else {
                        // Throttle updates to prevent shaking
                        const now = Date.now();
                        if (now - lastUpdateTime > updateInterval) {
                            setGeneratedCode(codeContent);
                            lastUpdateTime = now;
                        }
                    }
                } else {
                    // Normal chat message
                    // Only update chat content if we are SURE it's not part of a code block start
                    if (!chunk.includes('`')) {
                        chatContent += chunk;
                        setMessages(prev => {
                            const updated = [...prev];
                            const lastMsg = { ...updated[updated.length - 1] };
                            lastMsg.content = chatContent;
                            updated[updated.length - 1] = lastMsg;
                            return updated;
                        });
                    } else {
                        // If it contains backticks, append to chatContent but don't update UI yet to avoid flashing
                        chatContent += chunk;
                        setMessages(prev => {
                            const updated = [...prev];
                            const lastMsg = { ...updated[updated.length - 1] };
                            lastMsg.content = chatContent;
                            updated[updated.length - 1] = lastMsg;
                            return updated;
                        });
                    }
                }

            }

            await saveGeneratedCode(codeContent.split('```')[0]);
            // Finalize
            if (isCode) {
                // Ensure we have the latest code
                setGeneratedCode(codeContent.split('```')[0]);

                setMessages(prev => {
                    const updated = [...prev];
                    const lastMsg = { ...updated[updated.length - 1] };
                    lastMsg.content = chatContent + "\n\nYour code is ready! Check the preview.";
                    updated[updated.length - 1] = lastMsg;
                    return updated;
                });
            }

        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (messages.length > 0) {
            saveMessages()
        }
    }, [messages])


    const saveMessages = async () => {
        const result = await axios.put('/api/chats', {
            messages: messages,
            frameId: frameId
        })
        console.log(result.data)
    }

    useEffect(() => {
        if (generatedCode.length > 10 && !loading) {
            saveGeneratedCode(generatedCode)
        }
    }, [generatedCode, loading])

    useEffect(() => {
        if (onSaveData) {
            saveGeneratedCode(generatedCode)
        }
    }, [onSaveData])


    const saveGeneratedCode = async (code: string) => {
        const result = await axios.put('/api/frames', {
            designCode: code,
            frameId: frameId,
            projectId: projectId
        })
        console.log(result.data)
        toast.success('Website is Ready!')
    }

    const [isCodeOpen, setIsCodeOpen] = useState(false);

    const onDownload = () => {
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Generated Website</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        </head>
        <body>
            ${generatedCode}
        </body>
        </html>
    `;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        a.click();
    }

    const onViewCode = () => {
        setIsCodeOpen(true);
    }

    const onFullScreen = () => {
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Website Preview</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        </head>
        <body>
            ${generatedCode}
        </body>
        </html>
    `;
        const newWindow = window.open();
        newWindow?.document.write(html);
    }

    return (
        <div>
            <PlaygroundHeader onDownload={onDownload} onViewCode={onViewCode} onFullScreen={onFullScreen} />
            <div className='flex '>
                <ChatSection messages={messages ?? []} onSend={(input: string) => SendMessages(input)} loading={loading} />
                <WebsiteDesign generatedCode={generatedCode} />
            </div>
            <Dialog open={isCodeOpen} onOpenChange={setIsCodeOpen}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                    <DialogHeader>
                        <DialogTitle>Generated Code</DialogTitle>
                        <DialogDescription>
                            Here is the source code for your design:
                        </DialogDescription>
                    </DialogHeader>
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[60vh]">
                        <code>{generatedCode}</code>
                    </pre>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default PlayGround
