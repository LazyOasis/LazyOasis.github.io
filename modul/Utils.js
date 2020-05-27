export const grab = document.getElementById.bind(document);

export function create(tag, { id, qlass, text } = {}) {
    let el = document.createElement(tag);

    if (id) el.id = id;
    if (qlass) el.className = qlass;
    if (text) el.textContent = text;

    return el;
}

export function parametric(t) {
    let sqt = t * t;
    return sqt / (2.0 * (sqt - t) + 1.0);
}

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; --i) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function randint(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min;
}