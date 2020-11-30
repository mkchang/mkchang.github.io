window.onload = async function() {
    const state = {
        webGazerOn: false
    };
    const webGazerStart = document.getElementById('WebGazerStart');
    const webGazerStop = document.getElementById('WebGazerStop');

    webGazerStart.addEventListener('click', async () => {
        if (!state.webGazerOn) {
            webgazer.setGazeListener(function(data, elapsedTime) {
                // if (data == null) {
                //     return;
                // }
            }).begin();
            webgazer.showPredictionPoints(true);
            state.webGazerOn = true;
        }
    });

    webGazerStop.addEventListener('click', () => {
        if (state.webGazerOn) {
            webgazer.pause();
            webgazer.stopVideo();
            webgazer.showPredictionPoints(false);
            var gazeDot = document.getElementById('webgazerGazeDot');
            gazeDot && gazeDot.remove();
            webgazer.end();
            state.webGazerOn = false;
        }
    });
};

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    webgazer.clearData();
    ClearCalibration();
    PopUpInstruction();
}
