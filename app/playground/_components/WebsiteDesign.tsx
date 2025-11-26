import React, { useEffect, useState } from "react";

type Props = {
    generatedCode: string;
};

function WebsiteDesign({ generatedCode }: Props) {
    const [srcDoc, setSrcDoc] = useState("");

    useEffect(() => {
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
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.1/lottie.min.js"></script>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
                <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
                <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/dist/tippy.css" />
                <script src="https://unpkg.com/@popperjs/core@2"></script>
                <script src="https://unpkg.com/tippy.js@6"></script>
                <style>
                    body {
                        padding: 0;
                        margin: 0;
                        overflow-x: hidden;
                    }
                </style>
            </head>
            <body>
                ${generatedCode}
            </body>
            </html>
        `;
        setSrcDoc(html);
    }, [generatedCode]);

    return (
        <div className="p-4 flex-1 h-[91vh] overflow-hidden">
            <iframe
                srcDoc={srcDoc}
                title="Website Preview"
                className="w-full h-full border rounded-lg shadow-md bg-white"
                sandbox="allow-scripts allow-same-origin"
            />
        </div>
    );
}

export default WebsiteDesign;
