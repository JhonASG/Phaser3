export const drawPlatforms = {
    0: {
        "obj1": [ 180, 530, "ground" ],
        "obj2": [ 560, 530, "ground" ],
        "obj3": [ 800, 530, "platform" ],
        "obj4": [ 180, 500, "ground" ],
        "obj5": [ 560, 500, "ground" ],
        "obj6": [ 800, 500, "platform" ],
    },
    1: {
        "obj1": [ 400, 400, "ground" ],
        "obj2": [ 300, 280, "ground" ],
        "obj3": [ 50, 190, "ground" ],
        "obj4": [ 750, 160, "ground" ],
    },
    2: {
        "obj1": [ 145, 100, "ground" ],
        "obj2": [ 240, 100, "ground" ],
        "obj3": [ 240, 220, "ground" ],
        "obj4": [ 240, 320, "ground" ],
        "obj5": [ 480, 320, "ground" ],
        "obj6": [ 240, 420, "ground" ],
        "obj7": [ 520, 420, "ground" ],
    },
    3: {
        "obj1": [ 145, 100, "ground" ],
        "obj2": [ 335, 100, "ground" ],
        "obj3": [ 430, 100, "ground" ],
        "obj4": [ 240, 220, "ground" ],
        "obj5": [ 525, 220, "ground" ],
        "obj6": [ 535, 320, "ground" ],
        "obj7": [ 240, 420, "ground" ],
        "obj8": [ 715, 420, "ground" ],
    }
}

export const drawPlayers = {
    1: {
        "width": 280,
        "height": 400,
        "asset": "dude",
        "bounce": 0.25,
        "worldCollide": true
    },
    2: {
        "width": 180,
        "height": 400,
        "asset": "secondPlayer",
        "bounce": 0.25,
        "worldCollide": true
    }
}

export const drawStars = {
    1: {
        "quantity": 11,
        "posX": 12,
        "posY": 0,
        "step": 50,
        "bounce": 0.5
    }
}