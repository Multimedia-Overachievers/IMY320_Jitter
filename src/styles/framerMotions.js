const easeVar = [0.43, 0.13, 0.23, 0.96];
const durationVar = 1;

const transition = {duration: durationVar, ease: easeVar };

const slideInLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
};

const slideInRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
};

const slideInTop = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const slideInBottom = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

export {
    slideInLeft,
    slideInRight,
    fadeIn,
    slideInTop,
    slideInBottom,
    transition
};