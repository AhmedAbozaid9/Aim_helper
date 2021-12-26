// using the percom library to get all the positions using permutations
import percom from './node_modules/percom/src/permutation.js'
//change the background and center the circles container
$('body').css({
    backgroundColor: '#212121',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
})
//an html div element that will contain all the generated circles
const circles = $('.circles')
//add some styling to the circles conteainer
circles.css({
    width: 100,
    height: 100,
    position: 'relative',
    margin: 'auto auto',
    transform: 'translate(-50%,-50%)',
})
//some variables that will track how many circles has been created, how many times the mouse has been clicked and how many times the player has aimed correctly
let createdCircles = 0,
    clicks = 0,
    score = 0
    
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function getRandomNumber(max) {
    // a function that returns a random int between 0 and max - 1
    return Math.floor(Math.random() * max)
}

function generatePositions() {
    //this function will generate a kind of grid for the circles
    const positions = []
    const width = $(document).width()
    const height = $(document).height()
    //this expression will see which is less, then it will generate a number of positions based on it.
    const maxPosition = (width < height ? width : height) / 2
    //all the available positions that we will use permutations on
    for (let number = maxPosition * -1 + 160; number < maxPosition; number += 160) {
        positions.push(number)
    }
    // returning the values that are not in the occupied array
    return percom.per(positions,2)
}   

// a list to keep track of the positions of the current displayed circles and another to keep track of the available positions
let occupied = []
let availablePositions = generatePositions()


function createCircle() {
    //this function will be always called whenever the player clicks the screen or clicks any circle. it creates the position of the center of the circle.
    console.log(availablePositions)
    //get a random position from the available positions
    const idx = getRandomNumber(availablePositions.length)
    let position = availablePositions[idx]
    //store the value of that index inside the occupied array and remove it from the available positions
    occupied.push(position)
    availablePositions = availablePositions.filter(p => !arraysEqual(position,p))
    console.log(availablePositions)
    //create a circle and add it to the DOM
    const circle = $('<div></div>').addClass('circle').css({
        position: 'absolute',
        left: position[0],
        top: position[1],
        width: '100px',
        height: '100px',
        backgroundColor: '#396EB0',
        borderRadius: '50%',
        transform: 'translate(-50%,-50%)',
    })
    circles.append(circle)
    createdCircles++
}
//add an event listener to all the circles that will be created inside the 'circles'
circles.on('click', '.circle', function () {
    score++
    //return back the position of the removed circle since its available again
    const position = [parseInt($(this).css('left')), parseInt($(this).css('top'))]
    $(this).remove()
    //remove the position from the occupied array and return it back to be an available position
    occupied = occupied.filter(p => !arraysEqual(position,p))
    availablePositions.push(position)
    createCircle()
})
//add an event listener to the document to calculate the total number of clicks
$(document).click(() => {
    clicks++
})
createCircle()
createCircle()
createCircle()
