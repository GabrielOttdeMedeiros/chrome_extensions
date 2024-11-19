document.addEventListener('DOMContentLoaded', function() {
    const colorPicker = document.getElementById('colorPicker');
    const saveButton = document.getElementById('saveButton');
  
    // Retrieve the saved color and set it as the default value
    chrome.storage.sync.get(['progressBarColor'], function(result) {
      colorPicker.value = result.progressBarColor || '#4caf50'; // Default color
    });
  
    saveButton.addEventListener('click', function() {
      const selectedColor = colorPicker.value;
      chrome.storage.sync.set({ 'progressBarColor': selectedColor }, function() {
        console.log('Color saved: ' + selectedColor);
        // Optionally, provide user feedback
        alert('Progress bar color saved!');
      });
    });
  });
  