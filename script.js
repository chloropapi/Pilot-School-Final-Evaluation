function generateReport() {


let pilot = document.getElementById("pilotName").value;
let evaluator = document.getElementById("evaluator").value;
let notes = document.getElementById("notes").value;



if(pilot === "") {

alert("Please enter a pilot name.");
return;

}



let ratings = [

{
name:"Startup & Takeoff",
id:"startup"
},

{
name:"Flight Patterns & Maneuvers",
id:"patterns"
},

{
name:"Maneuvers / Tactical Response",
id:"tactics"
},

{
name:"Onboarding / Landing",
id:"landing"
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



if(!selected){

failed.push(category.name + " was not graded");
return;

}



let value = Number(selected.value);

score += value;



if(value >= 4){

passed.push(category.name);

}

else if(value === 3){

issues.push(category.name);

}

else{

failed.push(category.name);

}


});




let checklist = document.querySelectorAll(
'input[type="checkbox"]'
);


let completed = 0;


checklist.forEach(item => {

if(item.checked){

completed++;

}

});



let checklistScore = Math.round(
(completed / checklist.length) * 100
);



let ratingScore = Math.round(
(score / maxScore) * 100
);



let finalScore = Math.round(
(ratingScore + checklistScore) / 2
);



let result = finalScore >= 80 ? "PASS" : "FAIL";




let feedback = "";



feedback += `

<h3>Checklist Completion</h3>

<p>${completed}/${checklist.length} completed (${checklistScore}%)</p>

`;




if(passed.length){

feedback += `

<h3>Strengths</h3>

<ul>

${passed.map(x=>`<li>${x} performed above standard.</li>`).join("")}

</ul>

`;

}




if(issues.length){

feedback += `

<h3>Needs Improvement</h3>

<ul>

${issues.map(x=>`<li>${x} requires additional practice.</li>`).join("")}

</ul>

`;

}




if(failed.length){

feedback += `

<h3>Failed Areas</h3>

<ul>

${failed.map(x=>`<li>${x} did not meet standards.</li>`).join("")}

</ul>

`;

}




if(notes){

feedback += `

<h3>Instructor Notes</h3>

<p>${notes}</p>

`;

}




document.getElementById("reportContent").innerHTML = `


<h3>Pilot:</h3>
<p>${pilot}</p>


<h3>Evaluator:</h3>
<p>${evaluator}</p>


<h3>Final Score:</h3>
<p>${finalScore}%</p>


<h2 class="${result === "PASS" ? "pass" : "fail"}">

${result}

</h2>


<div class="feedback">

${feedback}

</div>


`;




// Hide everything except report

document.getElementById("pilotInfo").style.display="none";

document.getElementById("evaluationForm").style.display="none";


document.getElementById("report").classList.remove("hidden");



window.scrollTo({

top:0,

behavior:"smooth"

});


}
