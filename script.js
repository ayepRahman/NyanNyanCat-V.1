$(document).ready(function() {
    // creating all var to the <Element>
    var $cont = $('#container')
    var $cat = $('#nyan')
    // //////// WALL ONE////////////////////
    var $wallOne = $('.wallOne')
    var $topWallOne = $('#topWallOne')
    var $bottomWallOne = $('#bottomWallOne')
    // /////////// WALL ONE H/W /////////////////////////////////////////////
    var wallOneHeight = parseInt($wallOne.css('height'))
    var $topWallOneHght = parseInt($topWallOne.css('height'))
    var $btmWallOneHgt = parseInt($bottomWallOne.css('height'))
    var $initWallOnePst = parseInt($wallOne.css('right'))
    // /////// WALL TWO ///////////////////////
    var $wallTwo = $('.wallTwo')
    var $topWallTwo = $('#topWallTwo')
    var $bottomWallTwo = $('#bottomWallTwo')
    // ////////// WALL TWO H/W /////////////////////////////
    var wallTwoHeight = parseInt($wallTwo.css('height'))
    var $topWallTwoHght = parseInt($topWallTwo.css('height'))
    var $btmWallTwoHgt = parseInt($bottomWallTwo.css('height'))
    var $initWallTwoPst = parseInt($wallTwo.css('right'))
    // /////////////////////////////////////////
    var $restartBttn = $('#restartBttn')
    var $score = $('#score')
    var $scoreUpdate = false
    var $speed = $('#speed')
    // //////////// CONTAINER ///////////////////////////////////////
    var $contHeight = parseInt($cont.height())
    var $contWidth = parseInt($cont.width())
    // ////////// CAT ///////////////////////////////////////////////
    var $catHeight = parseInt($cat.height())
    var $catPosition = parseInt($cat.css('left'))
    var $speedPixel = 1 // PIXEL of value!!!
    var $jumpCat = false
    // //////////// AUDIO////////////////////////////////////////////
    var $bgSound = $('audio')[0].play()
    var $deathSound = $('#deathSound')
    // ////////////////START GAME/////////////////////////////////////
    var $gameOver = false

    var $gameStart = setInterval(function() {
        // /////////// currentPosition ///////////////////////////////
        var $wallOneCurrentPosition = parseInt($wallOne.css('right'))
        var $wallTwoCurrentPosition = parseInt($wallTwo.css('right'))
        // ///////////////////////////////////////////////////////////
        var $topOneCrrtHgt = parseInt($topWallOne.css('height'))
        var $btmOneCrrtHgt = parseInt($bottomWallOne.css('height'))
        var $topTwoCrrtHgt = parseInt($topWallTwo.css('height'))
        var $btmTwoCrrtHgt = parseInt($bottomWallTwo.css('height'))
        // checking the condition of the collision of topwall,bottomwall,topcontainer and bottom container
        if (collision($cat, $topWallOne) || collision($cat, $bottomWallOne) || parseInt($cat.css('top')) <= 0 || parseInt($cat.css('top')) > $contHeight - $catHeight || collision($cat, $topWallTwo) || collision($cat, $bottomWallTwo)) {
            gameOver()
        } else {
            // wall positon is greater then the container with the cat width add score to the score.text
            if ($wallOneCurrentPosition > $contWidth - $catPosition || $wallTwoCurrentPosition > $contWidth - $catPosition) {
                if ($scoreUpdate === false) {
                    $score.text(parseInt($score.text()) + 1)
                    $scoreUpdate = true
                    // if score not update after cat pass the walls, add score by 1
                }
            }
        }
        // //// updating the score ///////////
        // changing the string of the return pixel into an integer
        // to check if the main wall hit the container width
        if ($wallOneCurrentPosition > $contWidth + 440) {
            // console.log here to check if collision is detected
            var $max = 280
            var $min = 0
            var $wallHeight = Math.random() * ($max - $min) + $min
            var $wallHeight = $wallHeight % 280
            var $newWallHeight = Math.round($wallHeight) // round of the float

            $topWallOne.css('height', $topWallOneHght + $newWallHeight)
            $bottomWallOne.css('height', $btmWallOneHgt - $newWallHeight)

            $topOneCrrtHgt = $topWallOneHght
            $btmOneCrrtHgt = $btmWallOneHgt

            $scoreUpdate = false
            $gameOver = false
            $wallOneCurrentPosition = $initWallOnePst
        }
        if ($wallTwoCurrentPosition > $contWidth) {
            var $max = 280
            var $min = 0
            var $wallHeight = Math.random() * ($max - $min) + $min
            var $wallHeight = $wallHeight % 280
            var $newWallHeight = Math.round($wallHeight) // round of the float

            $topWallTwo.css('height', $topWallTwoHght + $newWallHeight)
            $bottomWallTwo.css('height', $btmWallTwoHgt - $newWallHeight)

            $topTwoCrrtHgt = $topWallTwoHght
            $btmTwoCrrtHgt = $btmWallTwoHgt
            $scoreUpdate = false
            $gameOver = false
            $wallTwoCurrentPosition = $initWallTwoPst
        }
        if ($jumpCat === false) {
            gravity() // after cat is jump by pixel/height it run the gravity funtion down
        }
        $wallOne.css('right', $wallOneCurrentPosition + $speedPixel)
        $wallTwo.css('right', $wallTwoCurrentPosition + $speedPixel)
        // updating the $wallOneCurrentPosition + speedValue(pixel), the speed of the moving wall
    }, 1)
    // ////////// keydown Event ///////////////////////////////////
    $(document).on('keydown', function(e) {
        var key = e.keyCode
        if ($gameOver === false) { // stops the key from pressing
            if (key === 13 && $jumpCat === false) {
                $jumpCat = setInterval(flyUp, 13)
            }
        }
    })
    // ///////
    $(document).on('keyup', function(e) {
        var key = e.keyCode
        if (key === 13) {
            clearInterval($jumpCat)
            $jumpCat = false
        }
    })
    // /////////// UP////////////////////////////////////////////////
    function flyUp() {
        $cat.css('top', parseInt($cat.css('top')) - 15)
        // by -15 the cat height will go up
    }
    // ///////////Down Cat///////////////////////////////////////////
    function gravity() {
        $cat.css('top', parseInt($cat.css('top')) + 1.5)
        // creating a gravity tt pushes the cat down
    }

    // /////////// STOP GAME /////////////////////////////////////////
    function gameOver() {
        clearInterval($gameStart)
        $('audio')[1].play()
        $('audio')[0].pause()
        $gameOver = true
    }
    // ////// RESTARTBUTTON//////////////////////////////////////////
    $restartBttn.click(function() {
        location.reload()
        // just simply reloading the page
    })
    // ////// COLLISION ///////////////////////////////////////////////
    function collision($catpstn, $wallpstn) {
        // The .offset() method allows us to retrieve the current position of an element relative to the document.
        // The outerHeight() Get the current computed outer height (including padding, border, and optionally margin) for the first element in the set of matched elements or set the outer height of every matched element.
        //
        var x1 = $catpstn.offset().left // cat position on left
        var y1 = $catpstn.offset().top // cat position on top
        var h1 = $catpstn.outerHeight(true) // cat height position b4 hitting
        var w1 = $catpstn.outerWidth(true) // cat outerWidth b4 hitting
        var b1 = y1 + h1 // spaces in between the height
        var r1 = x1 + w1 // space in between
        var x2 = $wallpstn.offset().left // wall position left
        var y2 = $wallpstn.offset().top // wall position top
        var h2 = $wallpstn.outerHeight(true) // wall height
        var w2 = $wallpstn.outerWidth(true) // wall width
        var b2 = y2 + h2 // wall spaces height
        var r2 = x2 + w2 // wall space width

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
            return false
        }
        return true
    }
})
