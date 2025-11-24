

import React from "react";
import Section from "../../components/templates/Section";

const homeContent = [
    {
        type: "text",
        text: [
            {
                content: "MASCAPITOS STORE",
                variant: "h1",
                className: "text-center text-5xl md:text-7xl font-black tracking-tighter text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            },
            {
                content: "Elegancia en cada esencia.",
                variant: "p",
                className: "text-center text-xl text-theme-muted mb-12 font-light tracking-widest uppercase"
            }
        ]
    },
    
];

function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-theme-main">
            <Section content={homeContent} />
        </main>
    );
}

export default Home;