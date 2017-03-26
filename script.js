$(document).ready(function() {
    // creating all var to the <Element>
    var $cont = $('#container')
    var $cat = $('#nyan')
    var $wall = $('.wall')
    var $topWall = $('#topWall')
    var $bottomWall = $('#bottomWall')
    var $restartBttn = $('#restartBttn')
    var $score = $('#score')
    var $speed = $('#speed')
    // //////////// CONTAINER ///////////////////////////////////////
    var $contHeight = parseInt($cont.height())
    var $contWidth = parseInt($cont.width())
    // /////////// WALL /////////////////////////////////////////////
    var $mainWallHeight = parseInt($wall.css('height'))
    var $topWallHght = parseInt($topWall.css('height'))
    var $btmWallHgt = parseInt($bottomWall.css('height'))
    var $initWallPosition = parseInt($wall.css('right'))
    // ////////// CAT ///////////////////////////////////////////////
    var $catHeight = parseInt($cat.height())
    var $catPosition = parseInt($cat.css('left'))
    var $speedPixel = 1 // PIXEL of value!!!
    var $jumpCat = false
    var $scoreUpdate = false

    // ////////// MOVING WALL///////////////////////////////////////
    var $gameStart = setInterval(function() {
        // checking the condition of the collsion of topwall,bottomwall,topcontainer and bottom container
        if (collision($cat, $topWall) || collision($cat, $bottomWall) || parseInt($cat.css('top')) <= 0 || parseInt($cat.css('top')) > $contHeight - $catHeight) {
            gameOver()
        } else {
            var $initWallPosition = parseInt($wall.css('right'))
            //wall positon is greater then the container with the cat width
            if ($initWallPosition > $contWidth - $catPosition) {
                if ($scoreUpdate === false) {
                    $score.text(parseInt($score.text()) + 1)
                    $scoreUpdate = true
                }
            }
        }
        // //// updating the score ///////////
        var $wallCurrentPosition = parseInt($wall.css('right'))
        var $topCurrentHgt = parseInt($topWall.css('height'))
        var $btmCurrentHgt = parseInt($bottomWall.css('height'))
        // changing the string of the return pixel into an integer
        // to check if the main wall hit the container width
        if ($wallCurrentPosition > $contWidth) {
            var $max = 250
            var $min = 0
            var $wallHeight = Math.random() * ($max - $min) + $min
            var $wallHeight = $wallHeight % 250
            var $newWallHeight = Math.round($wallHeight) // round of the float
            $topWall.css('height', $topWallHght + $newWallHeight)
            $bottomWall.css('height', $btmWallHgt - $newWallHeight)
            $topCurrentHgt = $topWallHght
            $btmCurrentHgt = $btmWallHgt
            $scoreUpdate = false
            $gameOver = false
            $wallCurrentPosition = $initWallPosition
            // changing the initWallPosition into a new value when it goes out from the container
            // if the $wallCurrentPosition is greater then container width return to the original position
        }

        if ($jumpCat === false) {
            gravity()
        }

        $wall.css('right', $wallCurrentPosition + $speedPixel)
        // updating the $wallCurrentPosition + speedValue(pixel)
    }, 1)
    // ////////// keydown Event ///////////////////////////////////
    $(document).on('keydown', function(e) {
        var key = e.keyCode
        if (key === 13 && $jumpCat === false) {
            $jumpCat = setInterval(flyUp, 15)
        }
    })

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
    }
    // ///////////Down Cat///////////////////////////////////////////
    function gravity() {
        $cat.css('top', parseInt($cat.css('top')) + 1.5)
    }

    // /////////// STOP GAME /////////////////////////////////////////
    function gameOver() {
        clearInterval($gameStart)
        $gameOver = true
    }

    //////// RESTART BUTTON////////////////////////////////////////////
    $restartBttn.click(function() {
        location.reload()
        // just simply reloading the page

    })

    // ////// COLLISION ///////////////////////////////////////////////

    function collision($div1, $div2) {
      //The .offset() method allows us to retrieve the current position of an element relative to the document.
      //The outerHeight() Get the current computed outer height (including padding, border, and optionally margin) for the first element in the set of matched elements or set the outer height of every matched element.
      //
        var x1 = $div1.offset().left //
        var y1 = $div1.offset().top //
        var h1 = $div1.outerHeight(true) //
        var w1 = $div1.outerWidth(true) //
        var b1 = y1 + h1 //
        var r1 = x1 + w1 //
        var x2 = $div2.offset().left //
        var y2 = $div2.offset().top //
        var h2 = $div2.outerHeight(true) //
        var w2 = $div2.outerWidth(true) //
        var b2 = y2 + h2 //
        var r2 = x2 + w2 //

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false
        return true
    }
})
