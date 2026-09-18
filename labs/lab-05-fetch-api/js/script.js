/* =========================================================
   Lab 03 functions (kept unchanged from the previous lab)
   ========================================================= */

// Number of seats currently available for the event
let availableSeats = 15;

// Interaction 1: Update the registration status text on the page
function checkRegistration() {
  let message = document.getElementById("registrationStatus");
  message.textContent = "Registration is currently open.";
}

// Interaction 2: Check seat availability using a simple if...else condition
function checkSeats() {
  let message = document.getElementById("seatMessage");

  if (availableSeats > 0) {
    message.textContent = "Seats are available. Remaining seats: " + availableSeats;
  } else {
    message.textContent = "Sorry, no seats are available.";
  }
}

// Interaction 3: Read the student's name and show a personalised greeting
function showGreeting() {
  let name = document.getElementById("fullname").value;
  let output = document.getElementById("greetingMessage");

  if (name === "") {
    output.textContent = "Please type your name above first.";
  } else {
    output.textContent = "Welcome, " + name + "! Thank you for registering.";
  }
}

// Independent feature: show the main event venue
function showVenue() {
  let message = document.getElementById("venueMessage");
  message.textContent = "The event will be held at the Auditorium Hall, Southeast University.";
}

/* =========================================================
   Lab 04 functions: Forms, Validation, JSON and Local Storage
   ========================================================= */

// Reads the form values, validates them, builds an object,
// converts it to JSON, and saves it in localStorage.
function submitRegistration() {
  let name = document.getElementById("fullname").value;
  let studentId = document.getElementById("studentId").value;
  let email = document.getElementById("email").value;
  let workshop = document.getElementById("workshop").value;
  let message = document.getElementById("formMessage");

  if (name === "") {
    message.textContent = "Please enter your full name.";
    return;
  }

  if (studentId === "") {
    message.textContent = "Please enter your Student ID.";
    return;
  }

  if (email === "") {
    message.textContent = "Please enter your email address.";
    return;
  }

  if (workshop === "") {
    message.textContent = "Please select a workshop track.";
    return;
  }

  // Group the validated values into one registration object
  let registration = {
    name: name,
    studentId: studentId,
    email: email,
    workshop: workshop
  };

  // Convert the object to JSON text
  let jsonData = JSON.stringify(registration);

  // Save the JSON text in localStorage under the "registration" key
  localStorage.setItem("registration", jsonData);

  // Show the JSON text and a confirmation message on the page
  document.getElementById("jsonOutput").textContent = jsonData;
  message.textContent = "Registration saved successfully.";
}

// Loads the saved registration from localStorage and displays it
function showSavedRegistration() {
  let savedData = localStorage.getItem("registration");
  let output = document.getElementById("savedMessage");

  if (savedData === null) {
    output.textContent = "No saved registration was found.";
    return;
  }

  let registration = JSON.parse(savedData);

  output.textContent =
    registration.name + " (Student ID: " + registration.studentId +
    ") registered for " + registration.workshop + ".";
}

// Removes the saved registration data (used only for resetting practice data)
function clearRegistration() {
  localStorage.removeItem("registration");
  document.getElementById("jsonOutput").textContent = "No registration saved yet.";
  document.getElementById("savedMessage").textContent = "Saved registration cleared.";
}

/* =========================================================
   Lab 05 functions: HTTP, Fetch and Simple API Use
   ========================================================= */

// Requests workshop.json using fetch(), checks the response status,
// reads the JSON body and displays the values on the page.
async function loadWorkshop() {
  document.getElementById("loadMessage").textContent = "Loading...";

  const response = await fetch("data/workshop.json");

  if (response.status === 200) {
    const workshop = await response.json();

    document.getElementById("workshopTitle").textContent = workshop.title;
    document.getElementById("workshopDate").textContent = workshop.date;
    document.getElementById("workshopVenue").textContent = workshop.venue;
    document.getElementById("workshopSeats").textContent = workshop.seats;

    document.getElementById("loadMessage").textContent =
      "Workshop data loaded successfully.";
  } else {
    document.getElementById("loadMessage").textContent =
      "Could not load workshop data.";
  }
}

// Requests one sample user from the JSONPlaceholder practice API
// and displays the returned name and email.
async function loadSampleUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

  if (response.status === 200) {
    const user = await response.json();
    document.getElementById("apiUser").textContent =
      user.name + " - " + user.email;
  } else {
    document.getElementById("apiUser").textContent =
      "Could not load API data.";
  }
}
