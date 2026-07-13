function generateReport() {

    let pilot = document.getElementById("pilotName").value;
    let evaluator = document.getElementById("evaluator").value;
    let flightType = document.getElementById("flightType").value;
    let notes = document.getElementById("notes").value;


    if (pilot === "") {
        alert("Please enter a pilot name.");
        return;
    }



    // Rating categories (1-5)
    let ratings = [

        {
            name: "Startup & Takeoff",
            id: "startup"
        },

        {
            name: "Flight Patterns & Maneuvers",
            id: "patterns"
        },

        {
            name: "Maneuvers / Tactical Response",
            id: "tactics"
        },

        {
            name: "Onboarding / Landing",
            id: "landing"
        }

    ];



    let score = 0;
    let maxScore = ratings.length * 5;


    let passed = [];
    let issues = [];
    let failed = [];



    ratings.forEach(category => {


        let selected = document.querySelector(
            `input[name="${category.id}"]:checked`
        );


        if (!selected) {

            failed.push(category.name + " was not graded");

            return;

        }



        let value = Number(selected.value);


        score += value;



        if (value >= 4) {

            passed.push(category.name);

        }

        else if (value === 3) {

            issues.push(category.name);

        }

        else {

            failed.push(category.name);

        }


    });





    // Checklist scoring

    let checklistItems = document.querySelectorAll(
        'input[type="checkbox"]'
    );


    let checklistComplete = 0;


    checklistItems.forEach(item => {

        if(item.checked){

            checklistComplete++;

        }

    });



    let checklistPercentage = Math.round(
        (checklistComplete / checklistItems.length) * 100
    );




    let ratingPercentage = Math.round(
        (score / maxScore) * 100
    );



    let finalScore = Math.round(
        (ratingPercentage + checklistPercentage) / 2
    );




    let result;


    if(finalScore >= 80){

        result = "PASS";

    }

    else {

        result = "FAIL";

    }






    let feedback = "";




    feedback += `

    <h3>Checklist Completion</h3>

    <p>
    ${checklistComplete}/${checklistItems.length}
    completed (${checklistPercentage}%)
    </p>

    `;




    if(passed.length > 0){

        feedback += `

        <h3>Strengths</h3>

        <ul>

        ${passed.map(item =>
            `<li>${item} performed above standard.</li>`
        ).join("")}

        </ul>

        `;

    }




    if(issues.length > 0){

        feedback += `

        <h3>Needs Improvement</h3>

        <ul>

        ${issues.map(item =>
            `<li>${item} meets minimum standard but requires improvement.</li>`
        ).join("")}

        </ul>

        `;

    }




    if(failed.length > 0){

        feedback += `

        <h3>Failed / Unsatisfactory Areas</h3>

        <ul>

        ${failed.map(item =>
            `<li>${item} requires additional training.</li>`
        ).join("")}

        </ul>

        `;

    }





    if(notes !== ""){

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



    <h3>Evaluator:</h3>

    <p>${evaluator}</p>



    <h3>Flight Type:</h3>

    <p>${flightType}</p>



    <h3>Final Score:</h3>

    <p>
    ${finalScore}%
    </p>



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

        behavior:"smooth"

    });



}
