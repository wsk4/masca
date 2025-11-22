import React from "react";
import Section from "../../components/templates/Section";

const homeContent = [
    { type: "text", text: [{ content: "Bienvenido al eCommerce de Perfumes", variant: "h1", className: "text-center text-4xl font-bold mb-10 text-indigo-800" }] }
];

function Home() {
    return (
        <main className="max-w-3xl mx-auto p-8">
            <Section content={homeContent} />
        </main>
    );
}
export default Home;
