const state = {
    webGazerOn: false
};
let yesBtn, noBtn;

window.onload = async function() {

    const webGazerStart = document.getElementById('WebGazerStart');
    const webGazerStop = document.getElementById('WebGazerStop');
    const webGazerRecalibrate = document.getElementById('WebGazerRecalibrate');
    yesBtn = document.querySelector('.Tile.Yes');
    noBtn = document.querySelector('.Tile.No');

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
            if (data == null) {
                return;
            }
            const xprediction = data.x; //these x coordinates are relative to the viewport
            const yprediction = data.y; //these y coordinates are relative to the viewport
            const targetEl = document.elementFromPoint(xprediction, yprediction);
            highlightActiveTileThrottled(targetEl);
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

function justThrottle(fn, interval, callFirst) {
    var wait = false;
    var callNow = false;
    return function() {
        callNow = callFirst && !wait;
        var context = this;
        var args = arguments;
        if (!wait) {
            wait = true;
            setTimeout(function() {
                wait = false;
                if (!callFirst) {
                    return fn.apply(context, args);
                }
            }, interval);
        }
        if (callNow) {
            callNow = false;
            return fn.apply(this, arguments);
        }
    };
}

function highlightActiveTile(targetEl) {
    yesBtn = yesBtn || document.querySelector('.Tile.Yes');
    noBtn = noBtn || document.querySelector('.Tile.No');
    if ($.contains(yesBtn, targetEl) || targetEl === yesBtn) {
        noBtn.classList.remove('active');
        yesBtn.classList.add('active');
    } else if ($.contains(noBtn, targetEl) || targetEl === noBtn) {
        yesBtn.classList.remove('active');
        noBtn.classList.add('active');
    } else {
        yesBtn.classList.remove('active');
        noBtn.classList.remove('active');
    }
}

const highlightActiveTileThrottled = justThrottle(highlightActiveTile, 500);

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Recalibrate(){
    // document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    webgazer.clearData();
    ClearCalibration();
    PopUpInstruction();
}
