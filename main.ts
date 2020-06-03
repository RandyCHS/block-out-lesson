namespace SpriteKind {
    export const block = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.setVelocity(sprite.vx, -1 * sprite.vy)
})
function getPos (sprite: Sprite, otherSprite: Sprite) {
    if (sprite.x < otherSprite.x - 8 || sprite.x > otherSprite.x + 8) {
        direction = 1
    } else {
        direction = 0
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.block, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    getPos(sprite, otherSprite)
    if (direction == 1) {
        sprite.setVelocity(-1 * sprite.vx, sprite.vy)
    } else {
        sprite.setVelocity(sprite.vx, -1 * sprite.vy)
    }
    otherSprite.destroy()
})
let direction = 0
let tile: Sprite = null
let tilePick = 0
let x = 0
let paddle = sprites.create(img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . b b b b b b b b b b b b b b b b b b b b b b . . . . . . 
. . . . b b b b b b b b b b b b b b b b b b b b b b . . . . . . 
. . . . b b b b b b b b b b b b b b b b b b b b b b . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
`, SpriteKind.Player)
paddle.setPosition(79, 100)
paddle.setFlag(SpriteFlag.StayInScreen, true)
controller.moveSprite(paddle, 100, 0)
let projectile = sprites.createProjectileFromSprite(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . 9 9 9 . . . . . . . 
. . . . . 9 6 7 6 9 . . . . . . 
. . . . 9 6 7 6 7 6 9 . . . . . 
. . . . 1 7 1 7 1 7 1 . . . . . 
. . . . 8 6 7 6 7 6 8 . . . . . 
. . . . . 8 6 7 6 8 . . . . . . 
. . . . . . 8 8 8 . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, paddle, 50, -55)
projectile.setFlag(SpriteFlag.DestroyOnWall, false)
projectile.setFlag(SpriteFlag.BounceOnWall, true)
for (let index = 0; index <= 9; index++) {
    for (let index2 = 0; index2 <= 2; index2++) {
        x = index * 18
        if (index2 % 2 == 1) {
            x = index * 18 + 8
        }
        tilePick = randint(0, 2)
        if (tilePick == 0) {
            tile = sprites.create(img`
8 8 1 1 8 8 6 6 1 7 7 7 1 8 8 9 
8 8 9 1 1 6 6 9 9 8 8 7 1 8 8 9 
7 6 9 9 9 8 8 7 9 8 8 6 6 1 9 9 
7 6 6 1 1 8 8 7 9 1 6 6 1 1 9 9 
7 7 6 1 1 6 6 7 7 8 8 1 1 1 7 9 
8 8 9 1 6 6 9 9 9 8 8 1 6 1 7 9 
8 8 9 9 9 7 8 8 9 6 6 1 6 6 7 7 
7 7 7 8 8 7 8 8 6 6 9 9 9 6 8 8 
7 6 6 8 8 7 7 6 1 7 7 7 9 1 8 8 
6 6 7 7 7 1 1 6 6 7 1 8 8 7 7 7 
1 1 7 9 9 9 1 1 6 1 1 8 8 7 1 9 
8 8 1 1 6 9 8 8 6 1 9 9 9 1 1 9 
8 8 9 1 6 6 8 8 6 6 8 8 9 1 9 9 
7 6 9 9 9 6 9 9 9 6 8 8 6 6 7 7 
7 6 6 8 8 1 6 6 9 7 9 6 6 8 8 7 
7 7 6 8 8 6 6 7 7 7 9 9 9 8 8 7 
`, SpriteKind.block)
        } else if (tilePick == 1) {
            tile = sprites.create(img`
3 d 1 3 3 3 3 3 3 3 3 3 3 3 3 3 
3 d 1 3 d d d d d d d d d d d 3 
3 d 1 3 d 1 1 1 1 1 1 1 1 1 d 3 
3 d 1 3 d 1 3 3 3 3 3 3 3 1 d 3 
3 d 1 3 d 1 3 d d d d d 3 1 d 3 
3 d 1 3 d 1 3 d 1 1 1 d 3 1 d 3 
3 d 1 3 d 1 3 d 1 3 1 d 3 1 d 3 
3 d 1 3 d 1 3 d 1 3 1 d 3 1 d 3 
3 d 1 3 d 1 3 d d 3 1 d 3 1 d 3 
3 d 1 3 d 1 3 3 3 3 1 d 3 1 d 3 
3 d 1 3 d 1 1 1 1 1 1 d 3 1 d 3 
3 d 1 3 d d d d d d d d 3 1 d 3 
3 d 1 3 3 3 3 3 3 3 3 3 3 1 d 3 
3 d 1 1 1 1 1 1 1 1 1 1 1 1 d 3 
3 d d d d d d d d d d d d d d 3 
3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
`, SpriteKind.block)
        } else {
            tile = sprites.create(img`
2 2 2 1 1 1 1 1 1 1 1 1 1 1 1 1 
1 2 2 2 2 2 2 2 1 1 1 4 4 4 4 4 
1 1 2 2 2 2 2 4 4 4 4 4 4 4 4 4 
4 4 4 2 2 5 5 5 5 5 5 4 4 4 4 4 
4 4 4 4 2 2 2 2 2 5 5 5 5 5 4 4 
4 4 b b b b b b b 5 5 5 5 5 5 5 
b b b b b b b 5 5 5 5 5 2 2 2 2 
b b b b 5 5 5 5 5 5 5 5 5 5 2 2 
b b b 2 2 2 2 2 2 2 2 2 1 1 1 1 
1 1 1 1 1 1 2 2 2 1 1 1 1 1 1 1 
1 1 4 4 2 2 2 2 2 2 2 1 1 1 1 1 
4 4 4 4 4 4 2 2 2 2 2 2 2 2 2 4 
4 4 4 5 5 5 5 5 5 5 5 5 4 4 4 4 
5 5 5 5 5 5 5 5 5 4 4 4 4 4 4 4 
b b b b b 5 5 5 5 5 5 5 5 4 4 4 
. b b b b b b b b b b b 4 4 4 4 
`, SpriteKind.block)
        }
        tile.setPosition(x, index2 * 18 + 20)
    }
}
info.setScore(1)
scene.setBackgroundColor(13)
direction = 1
forever(function () {
    if (projectile.bottom > 119) {
        game.over(false, effects.slash)
    }
    if (info.score() == 30) {
        game.over(true, effects.bubbles)
    }
})
