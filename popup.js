// popup.js

// Function to fetch and display the current Nth parent value from storage
function fetchAndDisplayNthParentValue() {
  chrome.storage.local.get('nthParent', function(data) {
      // Use the stored value if it exists, otherwise default to 3
      const nthParentValue = data.nthParent ? data.nthParent : 3;
      document.getElementById('nthParent').value = nthParentValue;
  });
}

// Function to save the new Nth parent value entered by the user
function saveNthParentValue() {
  const nthParentInput = document.getElementById('nthParent');
  const nthParentValue = nthParentInput.value;

  // Parse the input value to ensure it's stored as a number
  chrome.storage.local.set({ nthParent: parseInt(nthParentValue, 10) }, function() {
      console.log('Nth Parent configuration saved:', nthParentValue);
  });
}


// Event listener for the DOMContentLoaded event to fetch and display the Nth parent value
document.addEventListener('DOMContentLoaded', fetchAndDisplayNthParentValue);

// Event listener for the save button click event to save the new value
document.getElementById('save').addEventListener('click', function() {
  saveNthParentValue();
  // Optionally, provide feedback to the user that the value was saved
  // For example, you can briefly change the button text to "Saved!" and then revert back
  const saveButton = document.getElementById('save');
  const originalText = saveButton.textContent;
  saveButton.textContent = 'Saved!';
  setTimeout(() => saveButton.textContent = originalText, 2000);

  // Close the popup window after a short delay, if desired
  setTimeout(() => window.close(), 500);
});
