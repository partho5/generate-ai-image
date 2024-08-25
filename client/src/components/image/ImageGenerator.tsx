'use client';

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PromptTextarea from "@/components/inputs/PromptTextarea";
import { RootState } from "@/app/store";
import { setGeneratedImage } from "@/app/store/slices/generatedImageSlice";

const imageSizes = [
    { value: "sd1024x1024", label: "Square (1024x1024) px - Standard" },
    { value: "sd1024x1792", label: "Portrait (1024×1792) px - Standard" },
    { value: "sd1792x1024", label: "Landscape (1792×1024) px - Standard" },
    { value: "hd1024x1024", label: "Square (1024x1024) px - HD" },
    { value: "hd1024x1792", label: "Portrait (1024×1792) px - HD" },
    { value: "hd1792x1024", label: "Landscape (1792×1024) px - HD" },
];


const defaultImages = [
    "https://nany-ai-images.s3.eu-north-1.amazonaws.com/ai-images/ai-dragon-1.jpg",
    "https://nany-ai-images.s3.eu-north-1.amazonaws.com/ai-images/ai-furry-art-1.png",
    "https://nany-ai-images.s3.eu-north-1.amazonaws.com/ai-images/ai-girl-1.png",
    "https://nany-ai-images.s3.eu-north-1.amazonaws.com/ai-images/dall-e-3-electric-guitar.jpg"
];

const ImageGenerator = () => {
    const dispatch = useDispatch();
    const userGeneratedImage = useSelector((state: RootState) => state.generatedImage.generatedImage);
    const [prompt, setPrompt] = useState("");
    const [imageSize, setImageSize] = useState(imageSizes[2].value);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (!userGeneratedImage) {
            intervalId = setInterval(() => {
                setFadeOut(true);
                setTimeout(() => {
                    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % defaultImages.length);
                    setFadeOut(false);
                }, 500); // Duration should match the CSS transition
            }, 3000); // Change image every 2 seconds
        }

        return () => clearInterval(intervalId);
    }, [userGeneratedImage]);

    const handleGenerateImage = async () => {
        const placeholderImage = "https://via.placeholder.com/512";
        dispatch(setGeneratedImage(placeholderImage));
    };

    return (
        <div className="input-container">
            <PromptTextarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />

            <div className="flex flex-col md:flex-row justify-center w-full md:space-x-4 space-y-4 md:space-y-0">
                <div className="image-size-dropdown-holder p-2 m-2 flex-1 text-center">
                    <select
                        value={imageSize}
                        onChange={(e) => setImageSize(e.target.value)}
                        className="w-full p-2 pt-3"
                    >
                        <option key={0} value="" disabled>
                            Image Size
                        </option>
                        {imageSizes.map((size) => (
                            <option key={size.value} value={size.value}>
                                {size.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="gen-btn-holder p-2 m-0 flex-1 text-center">
                    <button
                        onClick={handleGenerateImage}
                        className="generate-button text-xl w-full p-4"
                    >
                        Create Image
                    </button>
                </div>
            </div>

            <div className="generated-image-container flex items-center justify-center">
                <img
                    src={userGeneratedImage || defaultImages[currentImageIndex]}
                    alt="AI Generated Image"
                    className={`generated-image transition-opacity duration-500 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
                />
            </div>
        </div>
    );
};

export default ImageGenerator;
