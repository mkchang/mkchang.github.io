const state = {
    webGazerOn: false
};

window.onload = async function() {

    const webGazerStart = document.getElementById('WebGazerStart');
    const webGazerStop = document.getElementById('WebGazerStop');
    const webGazerRecalibrate = document.getElementById('WebGazerRecalibrate');

    webGazerStart.addEventListener('click', startWebGazer);

    webGazerStop.addEventListener('click', stopWebGazer);

    webGazerRecalibrate.addEventListener('click', () => {
        stopWebGazer();
        Recalibrate();
    });
};

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
}

function startWebGazer() {
    if (!state.webGazerOn) {
        webgazer.setGazeListener(function(data, elapsedTime) {
            // if (data == null) {
            //     return;
            // }
        }).begin();
        webgazer.showPredictionPoints(true);
        state.webGazerOn = true;
    }
}

function stopWebGazer() {
        if (state.webGazerOn) {
            webgazer.pause();
            webgazer.stopVideo();
            webgazer.showPredictionPoints(false);
            var gazeDot = document.getElementById('webgazerGazeDot');
            gazeDot && gazeDot.remove();
            webgazer.end();
            state.webGazerOn = false;
        }
    }

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Recalibrate(){
    // document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    webgazer.clearData();
    ClearCalibration();
    PopUpInstruction();
}
