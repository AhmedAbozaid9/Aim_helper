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

function generatePositions() {
    //this function will generate a kind of grid for the circles
    const positions = []
    const width = $(document).width()
    const height = $(document).height()
    //this expression will see which is less, then it will generate a number of positions based on it.
    const maxPosition = (width < height ? width : height) / 2
    //to make the grid I used a nested for loop to cover all the available positions
    for (let x = maxPosition * -1 + 160; x < maxPosition; x += 160) {
        for (let y = maxPosition * -1 + 160; y < maxPosition; y += 160) {
            positions.push({ x, y })
        }
    }
    return positions
}
function getRandomNumber(max) {
    // a function that returns a random int between 0 and max - 1
    return Math.floor(Math.random() * max)
}
// a list to keep track of the positions of the current displayed circles
let occupied = []
function createCircle() {
    //this function will be always called whenever the player clicks the screen or clicks any circle. it creates the position of the center of the circle.
    let availablePositions = generatePositions()
    //here I'll remove any element that is occupied by filtering the available positions
    availablePositions = availablePositions.filter((p) => !occupied.includes(p))
    //get a random position from the available positions
    const idx = getRandomNumber(availablePositions.length)
    let position = availablePositions[idx]
    //store the value of that index inside the occupied array
    occupied.push(position)
    const circle = $('<div></div>').addClass('circle').css({
        position: 'absolute',
        left: position.x,
        top: position.y,
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
    const position = $(this).css('top')
    console.log(position)
    occupied = occupied.filter((p) => p != position)
    $(this).remove()
    console.log(occupied)
    createCircle()
})
//add an event listener to the document to calculate the total number of clicks
$(document).click(() => {
    clicks++
})
createCircle()
createCircle()
createCircle()
