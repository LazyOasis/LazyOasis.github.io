const events = {
    kairu: {
        text: "hii, want a cake? come on in they're free if you give me money.",
        size: 70,
        offset: 330,
        bubbleOffset: [-20, 220]
    },
    boror: {
        text: "I have got this stuff perfectly legally. Shush.",
        size: 80,
        offset: 658,
        bubbleOffset: [-20, 220]
    },
    artemis:  {
        text: "Care to buy a weapon? I've collected a vast inventory from my travels as a merchant",
        size: 60,
        offset: 1076,
        bubbleOffset: [-30, 210]
    },
    agent:  {
        text: "privyet brat, are you looking for weapons? you want avtomat kalashnikova? i got you comrade as long as you have enough rubels we only sell veapons from the motherland, so no capitalistic bullshit, we sell ak47's akms ak74's zastava m70's finnish rk62's and much more! would you wanna buy a fine tool for combat? so tell me what do you want",
        size: 80,
        offset: 1344,
        bubbleOffset: [-20, 110]
    },
    gizmo: {
        text: "Want to buy some shaved ice from the freshest ice in the world? It's a very generous price and tastes wonderful! I've travelled the world in this hot air balloon looking for the bestest ingredients for the bestest shaved ice! Come buy one!",
        size: 60,
        offset: 1572,
        bubbleOffset: [-20, 210]
    },
    jon1:  {
        text: "Keep it low, we don't want to get that penguins eyes on us... He's got ties.",
        size: 60,
        offset: 1800,
        bubbleOffset: [-30, 220]
    },
    jon2:  {
        text: "You here for a lollipop? The white one's the good stuff, but maybe a bit too rich for a beginner.",
        size: 60,
        offset: 1900,
        bubbleOffset: [-20, 230]
    },
    wildcard:  {
        text: "Hey, welcome! Come on in and take a look around! Just don't blow in any of the cartridges - there's a fee for that!",
        size: 60,
        offset: 2140,
        bubbleOffset: [-20, 220]
    },
    elja2: {
        text: "... cheese",
        size: 80,
        offset: 2474,
        bubbleOffset: [30, 220]
    },
    fig: {
        text: "Everything you see here is only one hundred shmeckles! Indeed, browse my selection for the best protection",
        size: 80,
        offset: 2710,
        bubbleOffset: [-20, 220]
    }
};


const bubbleFrame = document.getElementById("layer-bubbles");
const bubble = document.getElementById("bubble");

let currentDialogue = null;


export function readyReader() {
    for (let [owner, data] of Object.entries(events)) {
        data.boundaries = [data.offset, data.offset + data.size];
        data.status = 0;
    }
}

export function resetAction() {
    if (currentDialogue) {
        currentDialogue.status = 0;
        currentDialogue = null;
        bubble.remove();
        bubble.textContent = "";
    }
}

export function commitAction(position) {
    const dialogue = Object.values(events).find(data => data.boundaries[0] < position && data.boundaries[1] > position);

    if (dialogue) {
        currentDialogue = dialogue;
        if (dialogue.status === 0) {
            dialogue.status = 1;
            bubble.textContent = dialogue.text;
            bubble.style.left = `${dialogue.offset + dialogue.bubbleOffset[0]}px`;
            bubble.style.top = `${dialogue.bubbleOffset[1]}px`;

            bubbleFrame.append(bubble);
        } else if (dialogue.status === 1) {
            resetAction();
        }
    }
}
