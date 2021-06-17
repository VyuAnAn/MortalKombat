export const getRandom = (number) => {
    return Math.ceil(Math.random() * number);
}

export const createRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export const createElement = (tag, className) => {
    // создать элемент, добавить класс при необходимости
    const $tag = document.createElement(tag);

    if (className) {
        $tag.classList.add(className)
    }

    return $tag;
}


function getCorrectTime(time){
    if (time < 10) {
        return `0${time}`;
    } else {
        return time;
    }
}

export const getTime = () => {
    let time = new Date();
    return `${getCorrectTime(time.getHours())}:${getCorrectTime(time.getMinutes())}`;
}






