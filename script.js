var timerId; // stores reference to the timeout
var timeLeft = 10;
const timerEl = document.getElementById("DisplayCountdown"); // ID tag h2
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const data = loadData(); // variable to load the data
console.log(data);



function displayData() { //elements of the table
    const time = document.getElementById('time');
    const lat = document.getElementById('lat');
    const long = document.getElementById('long');
    const gpsAlt = document.getElementById('gps-Alt');
    const bmpSensorAlt = document.getElementById('bmp-Sensor-Alt');
    const bmpSensorPressure = document.getElementById('bmp-Sensor-Pressure');
    const bmpSensorTemp = document.getElementById('bmp-Sensor-Temp');
    const digitalSensorTemp = document.getElementById('digital-Sensor-Temp');
    const cssSensorTemp = document.getElementById('css-Sensor-temp');
    const cssSensorECO2 = document.getElementById('css-sensor-eCO2');
    const cssSensorTVOC = document.getElementById('css-sensor-tVOC');
    const uv = document.getElementById('uv');
    const accelX = document.getElementById('accel-x');
    const accelY = document.getElementById('accel-y');
    const accelZ = document.getElementById('accel-z');
    const magneticX = document.getElementById('magnetic-x');
    const magneticY = document.getElementById('magnetic-y');
    const magneticZ = document.getElementById('magnetic-z');
    const gyroX = document.getElementById('gyro-x');
    const gyroY = document.getElementById('gyro-y');
    const gyroZ = document.getElementById('gyro-z');

    for (let i = 0; i < data.length; i++) { //function for changing data numbers on each text on the table.
        setTimeout(function() {
            time.textContent = data[i].time;
            lat.textContent = data[i].lat;
            long.textContent = data[i].long;
            gpsAlt.textContent = data[i].gpsAlt;
            bmpSensorAlt.textContent = data[i].bmpSensorAlt;
            bmpSensorPressure.textContent = data[i].bmpSensorPressure;
            bmpSensorTemp.textContent = data[i].bmpSensorTemp;
            digitalSensorTemp.textContent = data[i].digitalSensorTemp;
            cssSensorTemp.textContent = data[i].cssSensorTemp;
            cssSensorECO2.textContent = data[i].cssSensorECO2;
            cssSensorTVOC.textContent = data[i].cssSensorTVOC;
            uv.textContent = data[i].uv;
            accelX.textContent = data[i].accelX;
            accelY.textContent = data[i].accelY;
            accelZ.textContent = data[i].accelZ;
            magneticX.textContent = data[i].magX;
            magneticY.textContent = data[i].magY;
            magneticZ.textContent = data[i].magZ;
            gyroX.textContent = data[i].gyroX;
            gyroY.textContent = data[i].gyroY;
            gyroZ.textContent = data[i].gyroZ;

        }, 5000 * i)

    }

}



const countDown = function () {

    //Disables the start button
    startButton.classList.remove('button');
    startButton.classList.add('button--disabled');
    startButton.disabled = true;
    //Disables the stop button
    stopButton.classList.add('button');
    stopButton.classList.remove('button--disabled');
    stopButton.disabled = false;
    


    timeLeft--; //Decrement the timeLeft by 1
    timerEl.innerHTML = `T-${timeLeft}`;

    if (timeLeft === 5) {
        timerEl.innerHTML = `Warning Less than ½ way to launch, T-${timeLeft} `; // This change the text of h2 into 'Warning Less than ½ way to launch, time left = ' when the timer hit 5
        timerId = setTimeout(countDown, 1000); // this will repeat the decrementing function of the countdown
    } else if (timeLeft === 0) {
        timerEl.innerHTML = "Blast Off!"; // This change the text of h2 into 'BlastOff' when the timer hit

        // Disable the stop button, when the timer hit 0
        stopButton.disabled = true;
        stopButton.classList.remove('button');
        stopButton.classList.add('button--disabled');

        setTimeout(function() {
            displayData();
        }, 5000);


    } else {
        timerId = setTimeout(countDown, 1000); //setTimeout is a function that takes 2 arguments, 1 argument is a function, and 2nd is time or miliseconds. 1000ms = 1second. It will call the function every second. This will run the function indefinetly. This also store to timerId for a reference to stop timer.

    }





};

function stopTimer() {
    clearTimeout(timerId); //clearTimeout, takes one argument of the reference settimeout in this case is the timerId, and stop it from counting.
    startButton.classList.remove('button--disabled');
    startButton.classList.add('button');
    startButton.disabled = false;
    userStop = true;
    stopButton.disabled = true;
    stopButton.classList.remove('button');
    stopButton.classList.add('button--disabled');
}


//Add event listener to a button that has an id="startBtn"
// This prevents a bug where user clicks the start button again, causing timer to have duplicate value.
startButton.addEventListener('click', countDown);




function validateUser() {
    var userNameElement = document.querySelector('.userName');

    if (userNameElement) { // This will check if userNameElement is exist, and if it is, it will remove it.
        userNameElement.remove();
    }

    //value is a property of input element that returns the value of the input element
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var badge = Number(document.getElementById("badge").value); // Number() is a function that convert string to number
    var newChild = document.createElement('h2');
    var countdown = document.querySelector('.countdown-container');
    var submitButton = document.getElementById('submit');
    var parentForm = document.querySelector('#userInput');
    var table = document.getElementsByTagName('table')[0];


    //length is a property of string that returns the length of the string, and it is a number.
    if ((firstName.length <= 20 && firstName !== '') && (lastName.length <= 20 && lastName !== '') && (badge < 1000 && badge > 0)) {

        newChild.textContent = `Welcome ${firstName} ${lastName}, your badge number is ${badge}`;
        newChild.className = 'userName';
        countdown.appendChild(newChild); // This will append the newChild to the parent element
        countdown.style.display = 'block'; // This will display the countdown
        parentForm.style.display = 'none'; // This will hide the user input/login form
        table.style.display = 'block';


    } else {
        newChild.textContent = `Please enter valid information, name must be less than 20 characters, badge number must be less than 1000 and badge number cannot be "0"`;
        newChild.classList.add('userName');
        parentForm.appendChild(newChild);
    }
}

var button = document.getElementById("submit");
var sound = document.getElementById("mySound");

button.addEventListener("click", function() {
    sound.play();
});
