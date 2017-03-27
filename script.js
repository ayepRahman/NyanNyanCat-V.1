$(document).ready(function() {

    // creating all var to the <Element>
    var $cont = $('#container')
    var $cat = $('#nyan')
    var $wall = $('.wall')
    var $topWall = $('#topWall')
    var $bottomWall = $('#bottomWall')
    var $restartBttn = $('#restartBttn')
    var $score = $('#score')
    var $scoreUpdate = false
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
    // //////////// AUDIO////////////////////////////////////////////
    var $bgSound = $('audio')[0].play()
    var $deathSound = $('#deathSound')
    //////////////////START GAME/////////////////////////////////////
    var $gameStart = setInterval(function() {


        var $wallCurrentPosition = parseInt($wall.css('right'))
        var $topCurrentHgt = parseInt($topWall.css('height'))
        var $btmCurrentHgt = parseInt($bottomWall.css('height'))
        // checking the condition of the collsion of topwall,bottomwall,topcontainer and bottom container
        if (collision($cat, $topWall) || collision($cat, $bottomWall) || parseInt($cat.css('top')) <= 0 || parseInt($cat.css('top')) > $contHeight - $catHeight) {

            gameOver()
        } else {
            console.log($wallCurrentPosition, $contWidth, $catPosition)

            // wall positon is greater then the container with the cat width add score to the score.text
            if ($wallCurrentPosition > $contWidth - $catPosition) {
                if ($scoreUpdate === false) {
                    $score.text(parseInt($score.text()) + 1)
                    $scoreUpdate = true
                }
            }
        }
        // //// updating the score ///////////
        // changing the string of the return pixel into an integer
        // to check if the main wall hit the container width
        if ($wallCurrentPosition > $contWidth) {
            var $max = 280
            var $min = 0
            var $wallHeight = Math.random() * ($max - $min) + $min
            var $wallHeight = $wallHeight % 280
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
        // updating the $wallCurrentPosition + speedValue(pixel), the speed of the moving wall
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

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false
        return true
    }


})
