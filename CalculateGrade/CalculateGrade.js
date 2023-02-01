let sections = [];


function addSection() {
    let colorMessage = document.getElementById("ErrorMessage");
    const section = {
        name: document.getElementById("InputName").value,
        grade: document.getElementById("InputPercentage").value,
        bias: document.getElementById("InputBias").value / 100,
        Id: ""
    };
    check = false;
    for (let index = 0; index < sections.length; index++) {
        const element = sections[index];
        if (section.name === element.name) {
            check = true;
            break;
        }
    }

    if (!check) {
        if (section.name != "" && section.grade != "" && section.bias != "") {
            sections.push(section);
            const sectionElement = document.createElement("div");
            sectionElement.innerHTML = `<div class="card" id="${section.Id}"><h2>${section.name}</h2><br><input type="number" id="grade" value="${section.grade}" onchange="updateSection(${sections.length - 1}, 'grade', this.value)"/><br><input type="number" id="bias" value="${section.bias}" onchange="updateSection(${sections.length - 1}, 'bias', this.value)"/></div>  `;
            document.getElementById("sections").appendChild(sectionElement);
            document.getElementById("InputName").value = "";
            document.getElementById("InputPercentage").value = "";
            document.getElementById("InputBias").value = "";
            calculateGrade();
            colorMessage.textContent = "";
        } else {
            colorMessage.innerHTML = "<strong>Missing Required Data</strong> <br> Please ensure that all required fields have been properly filled out before submitting the form. Any missing information will prevent the system from processing your request. ";
        }
    } else {
        colorMessage.innerHTML = "<strong>Require Unique Name</strong>";
    }
}

function updateSection(index, key, value) {
    sections[index][key] = parseFloat(value);
    calculateGrade();
}

function calculateGrade() {
    let totalWeight = 0;
    let weightedGradeSum = 0;
    sections.forEach(section => {
        totalWeight += section.bias;
        weightedGradeSum += section.grade * (section.bias / 100);
    });
    const finalGrade = weightedGradeSum / (totalWeight / 100);
    document.getElementById("finalGrade").innerHTML = finalGrade.toFixed(2) + "%";
}

const rotatingDiv = document.getElementById("Inputs");
let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;
let stepX = (targetX - currentX) / 60;
let stepY = (targetY - currentY) / 60;

let currentXS = 0;
let currentYS = 0;
let targetXS = 0;
let targetYS = 0;
let stepXS = (targetXS - currentXS) / 2;
let stepYS = (targetYS - currentYS) / 2;

rotatingDiv.addEventListener("mouseover", () => {
    document.addEventListener("mousemove", rotate);
});

rotatingDiv.addEventListener("mouseout", function() {
    document.removeEventListener("mousemove", rotate);
    rotatingDiv.style.transition = "transform 1s ease-out";

    function animate() {
        currentX += stepX;
        currentY += stepY;
        rotatingDiv.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
        if (currentX !== targetX || currentY !== targetY) {
            requestAnimationFrame(animate);
        }
    }

    function AnimateShadow() {
        currentXS += stepXS;
        currentYS += stepYS;
        rotatingDiv.style.boxShadow = currentXS + "px " + currentYS + "px 10px rgba(0, 0, 0, 0.5)";
        if (currentXS !== targetXS || currentYS !== targetYS) {
            requestAnimationFrame(AnimateShadow);
        }
    }
    animate();
    AnimateShadow();
});

function rotate(event) {
    let x = event.clientX;
    let y = event.clientY;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let rotateX = (y / height * 180) - 90;
    let rotateY = (x / width * 180) - 90;
    rotateX *= 0.4;
    rotateY *= 0.4;
    rotatingDiv.style.transform = `rotateX(${-rotateX/2}deg) rotateY(${rotateY/2}deg)`;
    if (y < height / 2) {
        rotatingDiv.style.boxShadow = rotateY / 3 + "px " + ((y / (height / 1.5) * 180) - 90) / 3 + "px 10px rgba(0, 0, 0, 0.5)";
    }
}

const ALlSections = document.getElementsByClassName("card");
const EditButn = document.getElementById("EditButton");
DeleatButtons = document.getElementsByClassName("DeleatButton");
IsActive = false;

EditButn.addEventListener("click", function(event) {
    event.preventDefault();
    var DeleatButtons = document.getElementsByClassName("DeleatButton");
    if (IsActive) {
        IsActive = false;
        EditButn.className = "";
        for (let i = 0; i < ALlSections.length; i++) {
            ALlSections[i].id = "";
        }
        Array.from(document.getElementsByClassName("DeleatButton")).forEach(element => {
            element.remove();
        });
    } else if (!IsActive) {
        IsActive = true
        EditButn.className = "FullActive";
        for (let i = 0; i < ALlSections.length; i++) {
            ALlSections[i].id = "EditingItem";
            var button = document.createElement("div");
            button.innerHTML = '<button class="DeleatButton" onclick="RemoveSection(this)"></button>'
            ALlSections[i].appendChild(button);
        }
    }
});

function RemoveSection(object) {
    DeleatButtons = document.getElementsByClassName("DeleatButton");

    object.parentNode.parentNode.className = "fade-out";
    object.parentNode.parentNode.id = "";

    setTimeout(function() {
        object.parentNode.parentNode.parentNode.remove();
        calculateGrade()
    }, 500);

    sections = [];
    for (let index = 0; index < ALlSections.length; index++) {
        const element = ALlSections[index];
        const section = {
            name: element.querySelector("h2").textContent,
            grade: element.querySelector("input[type='number'][id='grade']").value,
            bias: element.querySelector("input[type='number'][id='bias']").value * 1,
            Id: ""
        };
        console.log(section);
        sections.push(section);
    }
}