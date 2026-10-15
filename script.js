// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const attendanceHeader = document.querySelector(".attendance-header");
const progressContainer = document.querySelector(".progress-container");
const conferenceFullMessage = document.getElementById("conferenceFullMessage");
const checkInButton = document.getElementById("checkInBtn");
const attendeeList = document.getElementById("attendeeList");
const attendeeTableBody = document.getElementById("attendeeTableBody");

// Track attendents
let count = 0;
const maxCount = 50;

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  // Increment count
  count++;
  console.log("total check-ins: ", count);
  attendeeCount.textContent = count;

  // Update progress bar
  const progress = Math.min((count / maxCount) * 100, 100);
  const percentage = Math.round(progress) + "%";
  progressBar.style.width = percentage;
  console.log(`Progress: ${percentage}`);

  //update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Add the attendee to the table
  const attendeeRow = document.createElement("tr");
  const nameCell = document.createElement("td");
  const teamCell = document.createElement("td");
  nameCell.textContent = name;
  teamCell.textContent = teamName;
  attendeeRow.appendChild(nameCell);
  attendeeRow.appendChild(teamCell);
  attendeeTableBody.appendChild(attendeeRow);
  attendeeList.style.display = "block";

  if (count === maxCount) {
    const teamNames = {
      water: "Team Water Wise",
      zero: "Team Net Zero",
      power: "Team Renewables",
    };
    const teamCounts = {
      water: parseInt(document.getElementById("waterCount").textContent),
      zero: parseInt(document.getElementById("zeroCount").textContent),
      power: parseInt(document.getElementById("powerCount").textContent),
    };
    const leadingTeams = [];
    let highestCount = 0;

    for (const teamKey in teamCounts) {
      if (teamCounts[teamKey] > highestCount) {
        highestCount = teamCounts[teamKey];
        leadingTeams.length = 0;
        leadingTeams.push(teamNames[teamKey]);
      } else if (teamCounts[teamKey] === highestCount) {
        leadingTeams.push(teamNames[teamKey]);
      }
    }

    attendanceHeader.style.display = "none";
    progressContainer.style.display = "none";
    conferenceFullMessage.textContent = `The conference is full! Congratulations to ${leadingTeams.join(" and ")} for leading the attendance!`;
    conferenceFullMessage.style.display = "block";
    checkInButton.disabled = true;
  }

  // show welcome message
  const message = `Welcome, ${name} from ${teamName}`;
  greeting.textContent = message;
  greeting.className = `success-message ${team}`;
  greeting.style.display = "block";
  console.log(message);

  form.reset();

 })