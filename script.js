// Get references to HTML elements
const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

// Define animation data with details for each step
const animationData = [
  {
    inputVal: 5,
    marginTop: 300,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    marginTop: -200,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    marginTop: -200,
    addElDelay: 2000,
    msg: 'decimalToBinary(1) returns "1" (base case) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 5000,
    removeElDelay: 10000,
  }
];

// Recursive function to convert decimal to binary
const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

// Function to show call stack animation
const showAnimation = () => {
  // Set initial text for the result element
  result.innerText = "Call Stack Animation";

  // Iterate through animation data and add elements with delays
  animationData.forEach((obj) => {
    setTimeout(() => {
      // Add a paragraph element with the specified ID and styling to the animation container
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px;" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    setTimeout(() => {
      // Set the text content of the added element to the specified message after a delay
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    setTimeout(() => {
      // Remove the added element after a delay
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  // Set the result element text content after the animation is complete
  setTimeout(() => {
    result.textContent = decimalToBinary(5);
  }, 20000);
};

// Function to check user input and handle conversion
const checkUserInput = () => {
  // Parse the input value to an integer
  const inputInt = parseInt(numberInput.value);

  // Check if the input is valid
  if (!numberInput.value || isNaN(inputInt)) {
    alert("Please provide a decimal number");
    return;
  }

  // If the input is 5, trigger the animation
  if (inputInt === 5) {
    showAnimation();
    return;
  }

  // Display the binary result for other input values
  result.textContent = decimalToBinary(inputInt);
  numberInput.value = "";
};

// Event listeners for button click and Enter key press
convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
