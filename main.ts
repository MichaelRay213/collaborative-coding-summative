function setLevel (level: number) {
    if (level == 0) {
        tiles.setTilemap(tilemap`level1`)
    } else if (level == 1) {
        tiles.setTilemap(tilemap`level2`)
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    jump()
})
function setPlayer () {
    mySprite = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    gravity = 200
    mySprite.ay = gravity
    scene.cameraFollowSprite(mySprite)
    controller.moveSprite(mySprite, 100, 0)
    info.setLife(3)
    info.setScore(0)
}
scene.onOverlapTile(SpriteKind.Player, sprites.swamp.swampTile1, function (sprite, location) {
    currentLevel += 1
    setLevel(currentLevel)
    initializeLevel()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    info.changeLifeBy(-1)
    tiles.placeOnRandomTile(mySprite, sprites.builtin.forestTiles0)
})
function jump () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -120
    }
}
function initializeLevel () {
    tiles.placeOnRandomTile(mySprite, sprites.builtin.forestTiles0)
}
let gravity = 0
let mySprite: Sprite = null
let currentLevel = 0
currentLevel = 0
setPlayer()
setLevel(currentLevel)
initializeLevel()
