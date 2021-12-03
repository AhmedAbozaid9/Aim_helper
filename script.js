//change the background
$("body").css("background-color", "#212121");
//an html div element that will contain all the generated circles
const circles = $(".circles");
//some variables that will track how many circles has been created, how many times the mouse has been clicked and how many times the player has aimed correctly
let createdCircles = 0,
    clicks = 0,
    score = 0;

function generatePositions() {
    const positions = [];
    const width = $(document).width();
    const height = $(document).height();
    //this expression will see which is less, then it will generate a number of positions based on it.
    const maxPosition = width < height ? width : height;

    for (let position = 110; position < maxPosition; position += 110) {
        positions.push(position);
    }
    return positions;
}
function getRandomNumber(max) {
    // a function that returns a random int between 0 and max - 1
    return Math.floor(Math.random() * max);
}
// a list to keep track of the positions of the current displayed circles
const occupied = [];
function createCircle() {
    //this function will be always called whenever the player clicks the screen or clicks any circle. it creates the position of the center of the circle.
    const availablePositions = generatePositions();
    const idx = getRandomNumber(availablePositions.length);
    //store the value of that index inside the occupied array
    occupied.push(availablePositions[idx]);
    const position = availablePositions.slice(idx, idx + 1)[0];
    console.log(position);
    const circle = $("<div></div>").css({
        left: position,
        top: position,
        width: "100px",
        height: "100px",
        backgroundColor: "#396EB0",
        position: "absolute",
        borderRadius: "50%",
        transform: "translate(-50%,-50%)",
    });
    circles.append(circle);
    createdCircles++;
}
//add an event listener to all the circles that will be created inside the 'circles'
circles.on("click", ".circle", function () {
    score++;
    $(this).remove();
    createCircle();
});
//add an event listener to the document to calculate the total number of clicks
$(document).click(() => {
    clicks++;
});
createCircle();
