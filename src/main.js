/*
#############################################################################
#                                                                           #
#   COMMENTS                                                                #
#                                                                           #
#   Game name: Moonjump                                                     #
#                                                                           #
#   Completed on Wednesday, May 4 2022                                      #
#                                                                           #
#   Collaborators                                                           #
#   Tracie Thornbury                                                        #
#   Nicolette Antisdel                                                      #
#   Anna Perlow                                                             #
#   Shloak Sinha                                                            #
#                                                                           #
#   Creative tilt:                                                          #
#                                                                           #
#   The idea of an endless runner where you're forced to jump constantly    #
#   and you can only affect the height of your jumps was decided on         #
#   extremely early into this game's development. Unfortunately, most of    #
#   our ideas (like collectible bunny capsules that would increase score    #
#   and cause bunnies to appear in the background) had to be scrapped       #
#   due to lack of time, and we only had time to implement this much.       #
#   -Anna                                                                   #
#                                                                           #
#   The art style is a saturated 2-D style, with stark contrast between     #
#   the background and the main character. The use of unsaturated colors    #
#   for the bunny attracts your eyes to its position. However, when an      #
#   obstacle appears, the use of a more saturated yellow or red is meant    #
#   to attract the player's attention.                                      #
#   This isn't a vector style, but maybe it would have been more            #
#   appropriate, since the effects of the style are very similar.           #
#   -Tracie                                                                 #
#                                                                           #
#############################################################################
*/

let config = {
    type: Phaser.AUTO,
    width: 960, //TODO: finalize width/height
    height: 540, // and see if we can fix the bug that doubles the size
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Menu, Shop, Play] // Shop scene has been scrapped due to lack of time.
}

let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyCONFIRM, keyJUMP, keyCANCEL, keyPAUSE;
let game = new Phaser.Game(config);