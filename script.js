function generateReport() {


    let pilot = document.getElementById("pilotName").value;
    let evaluator = document.getElementById("evaluator").value;
    let aircraft = document.getElementById("aircraft").value;
    let notes = document.getElementById("notes").value;



    if (pilot === "") {

        alert("Please enter a pilot name.");
        return;

    }



    let categories = [

        {
            name: "Preflight Procedures",
            id: "preflight"
        },

        {
            name: "Takeoff / Departure",
            id: "takeoff"
        },

        {
            name: "Aircraft Control",
            id: "control"
        },

        {
            name: "Communications",
            id: "comms"
        },

        {
            name: "Landing",
            id: "landing"
        }

    ];



    let score = 0;
    let maxScore = categories.length * 2;


    let passed = [];
    let failed = [];
    let issues = [];



    categories.forEach(category => {


        let selected = document.querySelector(
            `input[name="${category.id}"]:checked`
        );


        if (!selected) {

            failed.push(category.name + " was not evaluated");

            return;

        }



        let value = Number(selected.value);



        if (value === 2) {

            score += 2;
            passed.push(category.name);

        }


        else if (value === 1) {

            score += 1;
            issues.push(category.name);

        }


        else {

            failed.push(category.name);

        }


    });



    let percentage = Math.round(
        (score / maxScore) * 100
    );



    let result;


    if (percentage >= 80) {

        result = "PASS";

    }

    else {

        result = "FAIL";

    }




    let feedback = "";



    if (passed.length > 0) {

        feedback += `
        <h3>Strengths</h3>
        <ul>
        ${passed.map(item => `<li>${item} met standards.</li>`).join("")}
        </ul>
        `;

    }



    if (issues.length > 0) {

        feedback += `
        <h3>Needs Improvement</h3>
        <ul>
        ${issues.map(item => `<li>${item} requires additional practice.</li>`).join("")}
        </ul>
        `;

    }



    if (failed.length > 0) {

        feedback += `
        <h3>Failed Areas</h3>
        <ul>
        ${failed.map(item => `<li>${item} did not meet standards.</li>`).join("")}
        </ul>
        `;

    }



    if (notes !== "") {

        feedback += `
        <h3>Instructor Notes</h3>
        <p>${notes}</p>
        `;

    }



    let report = document.getElementById("report");

    let content = document.getElementById("reportContent");



    content.innerHTML = `

        <h3>Pilot:</h3>
        <p>${pilot}</p>


        <h3>Aircraft:</h3>
        <p>${aircraft}</p>


        <h3>Evaluator:</h3>
        <p>${evaluator}</p>


        <h3>Score:</h3>
        <p>${score}/${maxScore} (${percentage}%)</p>


        <h2 class="${result === "PASS" ? "pass" : "fail"}">

        ${result}

        </h2>


        <div class="feedback">

        ${feedback}

        </div>

    `;



    report.classList.remove("hidden");



    window.scrollTo({

        top: document.body.scrollHeight,

        behavior: "smooth"

    });


}
