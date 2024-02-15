// Listen for a message from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "openTextInputPopup") {
    openTextInputPopup();
  }
});
function openTextInputPopup() {
  // Check if our popup already exists in the page
  if (document.getElementById('my-extension-text-input-popup')) {
    // If the popup already exists, simply show it again
    document.getElementById('my-extension-text-input-popup').style.display = 'block';
    return;
  }

  // Create a container for the popup
  const popupContainer = document.createElement('div');
  popupContainer.id = 'my-extension-text-input-popup';
  popupContainer.style.position = 'fixed';
  popupContainer.style.top = '20%';
  popupContainer.style.left = '20%';
  popupContainer.style.width = '60%';
  popupContainer.style.height = 'auto';
  popupContainer.style.backgroundColor = 'white';
  popupContainer.style.zIndex = '10000';
  popupContainer.style.padding = '20px';
  popupContainer.style.border = '1px solid black';
  popupContainer.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
  popupContainer.style.borderRadius = '5px';
  popupContainer.innerHTML = `
      <textarea id="my-extension-textarea" rows="6" style="width: 100%;"></textarea>
      <button id="my-extension-close-btn">Close</button>
  `;

  // Append the popup to the body
  document.body.appendChild(popupContainer);

  // Add click event listener to the close button
  document.getElementById('my-extension-close-btn').addEventListener('click', function () {
    document.getElementById('my-extension-text-input-popup').style.display = 'none';
  });
}
function highlightNthOrHighestParent(event, nthParent = 3) {
  let targetElement = event.target;
  let highestElement = null;

  // If there's a previously highlighted element, remove the highlight
  if (previousElement) {
    previousElement.style.border = '';
  }

  // Traverse up to the Nth parent or find the highest existing parent
  for (let i = 0; i < nthParent && targetElement; i++) {
    targetElement = targetElement.parentElement;
    if (targetElement) {
      highestElement = targetElement;
    }
  }

  if (highestElement) {
    // Add a bold yellow border to the highest parent
    highestElement.style.border = '3px solid yellow';
    // Store the highest parent to remove the border when the mouse moves to another element
    previousElement = highestElement;
  }
}

function highlightOnMouseMove(event) {
  chrome.storage.local.get('nthParent', (data) => {
    highlightNthOrHighestParent(event,parseInt(data.nthParent) || 3)
  });
}


// chrome.storage.local.get('nthParent', (data) => {
//   const nthParent = parseInt(data.nthParent) || 3;
//   const selection = window.getSelection();
//   const selectedElement = selection.anchorNode?.parentElement;

//   if (selectedElement && nthParent) {
//     let targetParent = selectedElement;
//     // Traverse up to the Nth parent
//     for (let i = 0; i < nthParent && targetParent; i++) {
//       targetParent = targetParent.parentElement;
//     }

//     if (targetParent) {
//       console.log(`Nth Parent Class (${nthParent}):`, targetParent.className);
//       // Perform any additional actions with targetParent here

//       // Add a bold yellow border to the targetParent
//       targetParent.style.border = '3px solid yellow';
//     } else {
//       console.log(`The element does not have ${nthParent} parent elements.`);
//     }
//   } else {
//     console.log("No element selected or Nth parent not defined.");
//   }
// });

let previousElement;

document.addEventListener('mouseover', (event) => {
  highlightOnMouseMove(event)
});
