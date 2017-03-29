# NyanNyan Cat V.1

[Live Demo Here](https://wdi-sg.github.io/wdi-project-1-ayepRahman/)


![NyanNyan Cat V.1](http://i.imgur.com/gDEA5mD.png)

What happend when you get A Flappy Bird && A Nyan Cat together. Introducing NyanNyan Cat V.1. Where you need to get the Nyan through random RAINBOW walls approaching you.

**Gameplay**
- Controlling Nyan to go through randomise moving wall to score points!

**GameFlow**
1) Initial Game with Nyan Cat position x,y

2) background sound .play() on page load

3) setInterval creates the moving walls and randomise the height

4) collsion will have 6 condition
- Nyan hitting the top container
- Nyan hitting the bottom containe
- Nyan hitting the top wall height
- Nyan hitting the bottom wall height
- Nyan hitting the top wall base width
- Nyan hitting the bottom wall base width

5) On Collision, background sound .pause() and .play() death sound

6) When cat goes through the gap, adding the score + 1

7) On GameOver, to restart game press the Restart Button on the bottom of the page .onload()

**Player**

ENTER: To Jump, You Can also Hold the Button To Fly

**Development**
- HTML5
- CSS3
- Js
- Jquery (Mostly are done using Jquery, convenience library)
- index.html / style.css / script.js


**References, Tools, and Inspiration**
* [Understanding Creating Gravity Like Function](https://www.youtube.com/watch?v=cXgA1d_E-jY&t=108s)
* [Targeting specific Maths.Random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
* [Jquery or my main js library](https://jquery.com/)
* [setInterval() function for my moving wall, randomise height, and loops](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)
* [Collision iam using .offset(),.outerHeight(),.outerWidth()]
* [.offset()](http://api.jquery.com/offset/)
* [.outerHeight()](http://api.jquery.com/outerheight/)
* [.outerWidth()](http://api.jquery.com/outerwidth/)
* [.keydown()](https://api.jquery.com/keydown/ )
* [.keyup()]( https://api.jquery.com/keyup/)
* [clearInterval](https://www.w3schools.com/jsref/met_win_clearinterval.asp )
* [.play()](https://developer.mozilla.org/fr/docs/Web/API/HTMLMediaElement/play )
* [.pause()](https://www.w3schools.com/tags/av_met_pause.asp )
* [.click(function)]https://api.jquery.com/click/( )

**Workflow**
1) Drafting the basic game structure.
2) Coding game logics.
3) Implement game graphic.
4) Debug.


**What I would've done differently**
* Would Love to touch on Canvas
* Creating My own Animated Cat Using sprites with an arrays and using forEach()
* Adding Level with Moving Randomise gap of walls
