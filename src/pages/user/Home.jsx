import React from "react";
import Section from "../../components/templates/Section";

const homeContent = [
    {
        type: "text",
        text: [
            {
                content: "Bienvenido a Mascapitos Store",
                variant: "h1",
                className: "text-center text-4xl font-bold mb-10 text-white"
            }
        ]
    }
];

function Home() {
    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
            <Section content={homeContent} />
        </main>
    );
}

export default Home;
