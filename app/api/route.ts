import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import Stream from "stream";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json()
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "google/gemini-2.5-flash-preview-09-2025",
                messages,
                Stream: true,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://localhost:3000",
                    "X-Title": "Ai Website Generator",

                },
                responseType: "stream",
            }
        );
        const stream = response.data;
        const encoder = new TextEncoder();
        const readable = new ReadableStream({
            async start(controller) {
                stream.on("data", (chunk: any) => {
                    const payloads = chunk.toString().split("\n\n");
                    for (const payload of payloads) {
                        if (payload.includes("[DONE]")) {
                            controller.close();
                            return;
                        }
                        if (payload.startsWith("data")) {
                            try {
                                const data = JSON.parse(payload.replace("data: ", ""));
                                const text = data.choices[0].delta.content;
                                if (text) {
                                    controller.enqueue(encoder.encode(text));
                                }

                            } catch (err) {
                                console.error("Error parsing stream", err);
                            }
                        }
                    }
                })
                stream.on("end", () => {
                    controller.close();
                })
                stream.on("error", (err: any) => {
                    controller.error(err);
                })
            }
        })

        return new NextResponse(readable, { headers: { "Content-Type": "text/plain; charset=utf-8", "Transfer-Encoding": "chunked" } })
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}