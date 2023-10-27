// TODO: make this less horrendous you lazy dog
document.addEventListener("DOMContentLoaded", () => {
    const backgroundDiv = document.getElementById("globalBackground");

    // https://www.w3schools.com/css/css3_variables_javascript.asp
    const root = document.querySelector(":root");
    const styleSheet = getComputedStyle(root);
    
    function followCursor(event) {
        // Get x and y position of cursor
        let x = event.clientX;
        let y = event.clientY;
    
        // Calculate width and height of the background div
        let divWidth = backgroundDiv.offsetWidth;
        let divHeight = backgroundDiv.offsetHeight;
    
        // Limits of variance of eye position in x, y directions
        // 2% x direction, 1% y direction
        const variance_x = 2;
        const variance_y = 1;
    
        // Initial positions of eyes in terms of percentage of background div
        const leftEyeLeftInitial = 31;
        const leftEyeTopInitial = 28;
        const rightEyeLeftInitial = 57;
        const rightEyeTopInitial = 24;

        // Get position of eye as a percentage (slice is to remove % sign)
        let leftEyePositionX = parseInt(styleSheet.getPropertyValue("--leftEyeLeft").slice(0, -1), 10);
        let leftEyePositionY = parseInt(styleSheet.getPropertyValue("--leftEyeTop").slice(0, -1), 10);
        let rightEyePositionX = parseInt(styleSheet.getPropertyValue("--rightEyeLeft").slice(0, -1), 10);
        let rightEyePositionY = parseInt(styleSheet.getPropertyValue("--rightEyeTop").slice(0, -1), 10);
    
        // Calculate position of eye in pixels
        let leftEyeLeft = leftEyePositionX / 100 * divWidth;
        let rightEyeLeft = rightEyePositionX / 100 * divWidth;
        let leftEyeTop = leftEyePositionY / 100 * divHeight;
        let rightEyeTop = rightEyePositionY / 100 * divHeight;

        // Calculate vector from each eye to mouse cursor
        let leftVectorX = x - leftEyeLeft;
        let leftVectorY = y - leftEyeTop;
        let rightVectorX = x - rightEyeLeft;
        let rightVectorY = y - rightEyeTop;
    
        // Normalise, scale, and offset vectors
        // Calculate inverse magnitude
        let leftInvMagnitude = 1 / Math.sqrt(leftVectorX * leftVectorX + leftVectorY * leftVectorY);
        let rightInvMagnitude = 1 / Math.sqrt(rightVectorX * rightVectorX + rightVectorY * rightVectorY);
        // Multiple by inverse magnitude to normalise, scale by the variance
        // and then add the initial eye position
        let leftPosX = leftEyeLeftInitial + leftVectorX * leftInvMagnitude * variance_x;
        let leftPosY = leftEyeTopInitial + leftVectorY * leftInvMagnitude * variance_y;
        let rightPosX = rightEyeLeftInitial + rightVectorX * rightInvMagnitude * variance_x;
        let rightPosY = rightEyeTopInitial + rightVectorY * rightInvMagnitude * variance_y;
    
        // Set CSS properties to actually move the eyes
        root.style.setProperty("--leftEyeLeft", `${leftPosX}%`);
        root.style.setProperty("--leftEyeTop", `${leftPosY}%`);
        root.style.setProperty("--rightEyeLeft", `${rightPosX}%`);
        root.style.setProperty("--rightEyeTop", `${rightPosY}%`);
    }
    
    document.addEventListener("mousemove", followCursor)
})