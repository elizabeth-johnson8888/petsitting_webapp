import { useState } from "react";

function ImageCarousel() {
    const images = [
        ["logo192.png", "Me and Tina"],
        ["logo512.png", "Me and Cora"],
        ["EJ_Emily_Bartell_Photography-22.jpg", "me and other"],
        ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div>
        <h3>Animals and I</h3>
        <img
            src={images[currentIndex][0]}
            alt={`Slide ${currentIndex + 1}`}
            className="Image-Carosel"
        />
        <p>{images[currentIndex][1]}</p>

        <button onClick={goToPrevious}>◀</button>
        <button onClick={goToNext}>▶</button>
        </div>
    );
}

export default ImageCarousel;