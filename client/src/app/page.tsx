// client/src/app/page.tsx
import './page.css';
import ImageGenerator from "@/components/image/ImageGenerator";


export default function Home() {
    return (
        <main className="home-page bg-gradient-flow">
            <h1 className="home-page-title tomorrow-semibold rainbow-text">Ai Image Creator</h1>
            <div className="flex justify-center min-h-screen w-full">
                <div className="md:w-1/2 w-full m-2">
                    <ImageGenerator/>
                </div>

                <div className="fixed-bottom-container">
                    <div className="left-btm-img-1">
                        <img src="https://nany-ai-images.s3.eu-north-1.amazonaws.com/ai-images/ai-cute-rabbit-1.png"
                             alt="AI image"/>
                    </div>
                    <div className="right-top-img-1">
                        <img src="https://nany-ai-images.s3.eu-north-1.amazonaws.com/ai-images/ai-puppy-1.png"
                             alt="AI image"/>
                    </div>
                </div>
            </div>


            <footer className="text-center p-4 bg-zinc-200">
                footer
            </footer>
        </main>
    );
}