$(document).ready(function () {
  $('audio')[0].play()
  $('#restartBttn').hide()
  $('#instruction').fadeOut(2000)
  /* ########## Creating all var to the <Element> ########## */
  var $cont = $('#container')
  /* ########## WALL ONE ########## */
  var $wallOne = $('.wallOne')
  var $topWallOne = $('#topWallOne')
  var $bottomWallOne = $('#bottomWallOne')
  /* ########## WALL ONE H/W ########## */
  var wallOneHeight = parseInt($wallOne.css('height'))
  var $topWallOneHght = parseInt($topWallOne.css('height'))
  var $btmWallOneHgt = parseInt($bottomWallOne.css('height'))
  var $initWallOnePst = parseInt($wallOne.css('right'))
  /* ########## WALL TWO ########## */
  var $wallTwo = $('.wallTwo')
  var $topWallTwo = $('#topWallTwo')
  var $bottomWallTwo = $('#bottomWallTwo')
  /* ########## WALL TWO H/W ########## */
  var wallTwoHeight = parseInt($wallTwo.css('height'))
  var $topWallTwoHght = parseInt($topWallTwo.css('height'))
  var $btmWallTwoHgt = parseInt($bottomWallTwo.css('height'))
  var $initWallTwoPst = parseInt($wallTwo.css('right'))
  /* ######################################## */
  var $restartBttn = $('#restartBttn')
  var $startButtn = $('#startButton')
  var $score = $('#score')
  var $scoreUpdate = false
  var $speed = $('#speed')
  /* ########## CONTAINER ########## */
  var $contHeight = parseInt($cont.height())
  var $contWidth = parseInt($cont.width())
  /* ########## CAT ########## */
  var $cat = $('#nyan')
  var $catTop = $cat.css('top', parseInt($cat.css('top')))
  var $catHeight = parseInt($cat.height())
  var $catPosition = parseInt($cat.css('left'))
  var $speedPixel = 1 // PIXEL of value!!!
  var $jumpCat = false
  /* ########## AUDIO ########## */

  var $deathSound = $('#deathSound')
  var $gameOver = false
  var $gravity = 1.5

  /* ########## START GAME ########## */
  var $gameStart = setInterval(function () {
        var $wallOneCurrentPosition = parseInt($wallOne.css('right'))
        var $wallTwoCurrentPosition = parseInt($wallTwo.css('right'))
        /* ########## CURRENT POSITION ########## */
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
            /* ########## UPDATING ########## */
            // changing the string of the return pixel into an integer
            // to check if the main wall hit the container width
            /* ########## Wall One Condition ########## */
        if ($wallOneCurrentPosition > $contWidth + 440) {
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
        /* ########## Wall Two Condition ########## */
        if ($wallTwoCurrentPosition > $contWidth) {
          var $max = 280
          var $min = 0
          var $wallHeight = Math.random() * ($max - $min) + $min
          var $wallHeight = $wallHeight % 280
          var $newWallHeight = Math.round($wallHeight) // round of the float

          $topWallTwo.css('height', $topWallTwoHght - $newWallHeight)
          $bottomWallTwo.css('height', $btmWallTwoHgt + $newWallHeight)

          $topTwoCrrtHgt = $topWallTwoHght
          $btmTwoCrrtHgt = $btmWallTwoHgt
          $scoreUpdate = false
          $gameOver = false
          $wallTwoCurrentPosition = $initWallTwoPst
        }
        if ($jumpCat === false) {
          gravity()
        // after cat is jump by pixel/height it run the gravity funtion down
        }
        $wallOne.css('right', $wallOneCurrentPosition + $speedPixel)
        $wallTwo.css('right', $wallTwoCurrentPosition + $speedPixel)
        // updating the $wallOneCurrentPosition + speedValue(pixel), the speed of the moving wall
      }, 1) // <=== setInterval
      /* ########## KEYDOWN EVENT ########## */
      $(document).on('keydown', function (e) {
        var key = e.keyCode
        if ($gameOver === false) { // stops the key from pressing
          if (key === 32 && $jumpCat === false) {
            $jumpCat = setInterval(flyUp, 13)
          }
        }
      })
      /* #################### */
      $(document).on('keyup', function (e) {
        var key = e.keyCode
        if (key === 32) {
          clearInterval($jumpCat)
          $jumpCat = false
        }
      })
      /* ########## UP ########## */
      function flyUp () {
        $cat.css('top', parseInt($cat.css('top')) - 15)
        // by -15 the cat height will go up
      }
      /* ########## GRAVITY CAT ########## */
      function gravity () {
        $cat.css('top', parseInt($cat.css('top')) + $gravity)
        // creating a gravity tt pushes the cat down
      }

      /* ########## STOP GAME ########## */
      function gameOver () {
        clearInterval($gameStart)
        $('audio')[1].play()
        $('audio')[0].pause()
        $('#restartBttn').fadeIn(1000).show(0)
        $gameOver = true
      }
      /* ########## RESTART BUTTON ########## */
      $restartBttn.click(function () {
        location.reload()
        // just simply reloading the page
      })
      /* ########## COLLISION ########## */
      function collision ($catpstn, $wallpstn) {
        // The .offset() method allows us to retrieve the current position of an element relative to the document.
        // The outerHeight() Get the current computed outer height (including padding, border, and optionally margin) for the first element in the set of matched elements or set the outer height of every matched element.
        var $catLeftPst = $catpstn.offset().left // cat position on left
        var $catTopPst = $catpstn.offset().top // cat position on top
        var $catOuterHeight = $catpstn.outerHeight(true) // cat height position b4 hitting
        var $catOuterWidth = $catpstn.outerWidth(true) // cat outerWidth b4 hitting
        var $catCollisionHeight = $catTopPst + $catOuterHeight // spaces in between the height
        var $catCollsionWidth = $catLeftPst + $catOuterWidth // sp ace in between
        var $wallLeftPst = $wallpstn.offset().left // wall position left
        var $wallTopPst = $wallpstn.offset().top // wall position top
        var $wallHeightPst = $wallpstn.outerHeight(true) // wall height
        var $wallWidthPst = $wallpstn.outerWidth(true) // wall width
        var $wallCollisionHght = $wallTopPst + $wallHeightPst // wall spaces height
        var $wallCollsionWidth = $wallLeftPst + $wallWidthPst // wall space width

        if ($catCollisionHeight < $wallTopPst || $catTopPst > $wallCollisionHght || $catCollsionWidth < $wallLeftPst || $catLeftPst > $wallCollsionWidth) {
          return false
        }
        return true
      }
    })
