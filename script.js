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
    backgroundColor: 'green',
    transform: 'translate(-50%,-50%)',
})
//some variables that will track how many circles has been created, how many times the mouse has been clicked and how many times the player has aimed correctly
let createdCircles = 0,
    clicks = 0,
    score = 0
// a list to keep track of the positions of the current displayed circles
let occupied = []

function isIncluded(arr1,arr2) {
    //takes a 2d array and a 1d array to check if the second array is inside the first.
    let result = false
    for(let arr of arr1){
        let isFound = true
        for(let idx in arr2){
            if(arr[idx] !== arr2[idx]) isFound = false
        }
        if(isFound){
            result = true
            break
        }
    }
    return result
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
    return percom.per(positions,2).filter((p) => !(occupied.includes(p)))
}   
function getRandomNumber(max) {
    // a function that returns a random int between 0 and max - 1
    return Math.floor(Math.random() * max)
}

function createCircle() {
    //this function will be always called whenever the player clicks the screen or clicks any circle. it creates the position of the center of the circle.
    let availablePositions = generatePositions()
    console.log(availablePositions)
    //get a random position from the available positions
    const idx = getRandomNumber(availablePositions.length)
    let position = availablePositions[idx]
    //store the value of that index inside the occupied array
    occupied.push(position)
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
    occupied = occupied.filter((p) => p !== position)
    $(this).remove()
    createCircle()
})
//add an event listener to the document to calculate the total number of clicks
$(document).click(() => {
    clicks++
})
createCircle()
createCircle()
createCircle()
