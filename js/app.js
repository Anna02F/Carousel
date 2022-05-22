//Declare the creatDots function
const createDots = (slides) => {
    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add("carousel_dots");

    slides.forEach((slide) => {
        const dot = document.createElement("button");
        dot.classList.add("carousel_dot");

        if (slide.classList.contains("is-selected"))
            dot.classList.add("is-selected");

        dotsContainer.appendChild(dot);
    });
    return dotsContainer;
};

//Declare all variables
const carousel = document.querySelector(".carousel");
const previousButton = carousel.querySelector(".previous-btn");
const nextButton = carousel.querySelector(".next-btn");
const contents = document.querySelector(".carousel_contents");

const slides = [...contents.querySelectorAll(".carousel_slide")];
const dotsContainer = createDots(slides);
const dots = [...dotsContainer.children];

//Add dots into the DOM
carousel.appendChild(dotsContainer);

//Positioning slides
const slideWidth = slides[0].getBoundingClientRect().width;
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + "px";
});

//Click the next button
nextButton.addEventListener("click", (event) => {
    //Get current and next slides
    const currentSlide = contents.querySelector(".is-selected");
    const nextSlide = currentSlide.nextElementSibling;

    //Show slide
    const destination = getComputedStyle(nextSlide).left;
    contents.style.transform = `translateX(-${destination})`;

    //Update is-selected class
    currentSlide.classList.remove("is-selected");
    nextSlide.classList.add("is-selected");

    //hide and show buttons
    previousButton.removeAttribute("hidden");
    if (!nextSlide.nextElementSibling) {
        nextButton.setAttribute("hidden", true);
    }

    //Highlight the dot
    const currentDot = dotsContainer.querySelector(".is-selected");
    const nextDot = currentDot.nextElementSibling;

    //Update is-selected class for dots
    currentDot.classList.remove("is-selected");
    nextDot.classList.add("is-selected");
});

//Click the previous button
previousButton.addEventListener("click", (event) => {
    //Get current and next slides
    const currentSlide = contents.querySelector(".is-selected");
    const previousSlide = currentSlide.previousElementSibling;

    //Show slide
    const destination = getComputedStyle(previousSlide).left;
    contents.style.transform = `translateX(-${destination})`;

    //Update is-selected class
    currentSlide.classList.remove("is-selected");
    previousSlide.classList.add("is-selected");

    //hide and show buttons
    nextButton.removeAttribute("hidden");
    if (!previousSlide.previousElementSibling) {
        previousButton.setAttribute("hidden", true);
    }

    //Highlight the dot
    const currentDot = dotsContainer.querySelector(".is-selected");
    const previousDot = currentDot.previousElementSibling;
    //Update is-selected class for dots
    currentDot.classList.remove("is-selected");
    previousDot.classList.add("is-selected");
});

//Dots
dotsContainer.addEventListener("click", (e) => {
    //Get the clicked dot
    const dot = e.target.closest("button");
    if (!dot) return;
    const clickedDotIndex = dots.findIndex((d) => d === dot);

    //Get the corresponding slide
    slideToShow = slides[clickedDotIndex];

    //Show the slide
    const destination = getComputedStyle(slideToShow).left;
    contents.style.transform = `translateX(-${destination})`;

    //Update is-selected class for slides
    const currentSlide = contents.querySelector(".is-selected");
    currentSlide.classList.remove("is-selected");
    slideToShow.classList.add("is-selected");

    // Update is-selected class for dots
    dots.forEach((d) => d.classList.remove("is-selected"));
    dot.classList.add("is-selected");

    //Show hide buttons
    if (clickedDotIndex === 0) {
        previousButton.setAttribute("hidden", true);
        nextButton.removeAttribute("hidden");
    } else if (clickedDotIndex === dots.length - 1) {
        previousButton.removeAttribute("hidden");
        nextButton.setAttribute("hidden", true);
    } else {
        previousButton.removeAttribute("hidden");
        nextButton.removeAttribute("hidden");
    }
});
