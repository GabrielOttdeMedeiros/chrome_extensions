(function() {
    'use strict';
  
    // Delay to ensure the page is fully loaded
    const delayInMilliseconds = 1;
  
    setTimeout(() => {
      let progressBarColor = '#4caf50'; // Default color
  
      function addProgressBars() {
        document.querySelectorAll('.kanban-card').forEach(card => {
          // Skip if the card already has a progress bar
          if (card.querySelector('.progress-bar')) return;
  
          const stepsDiv = card.querySelector('.kanban-card__steps');
  
          if (stepsDiv) {
            // Extract progress data
            const stepsText = stepsDiv.textContent.trim();
            const match = stepsText.match(/(\d+)\/(\d+)/);
  
            if (match) {
              const completed = parseInt(match[1], 10);
              const total = parseInt(match[2], 10);
              const progress = (completed / total) * 100;
  
              // Create progress bar elements
              const progressBarContainer = document.createElement('div');
              progressBarContainer.className = 'progress-bar';
              progressBarContainer.style.width = '100%';
              progressBarContainer.style.backgroundColor = '#26343b';
              progressBarContainer.style.borderRadius = '0';
              progressBarContainer.style.height = '6px';
              progressBarContainer.style.position = 'absolute';
              progressBarContainer.style.bottom = '0';
              progressBarContainer.style.left = '0';
  
              const progressInner = document.createElement('div');
              progressInner.style.width = `${progress}%`;
              progressInner.style.height = '100%';
              progressInner.style.backgroundColor = progressBarColor;
  
              progressBarContainer.appendChild(progressInner);
              card.style.position = 'relative';
              card.appendChild(progressBarContainer);
            }
          }
        });
      }
  
      // Initialize progress bars with the stored color
      function initializeProgressBars() {
        chrome.storage.sync.get(['progressBarColor'], function(result) {
          progressBarColor = result.progressBarColor || '#4caf50'; // Default color
          addProgressBars();
        });
      }
  
      // Update progress bars when the color changes
      chrome.storage.onChanged.addListener(function(changes, areaName) {
        if (areaName === 'sync' && changes.progressBarColor) {
          progressBarColor = changes.progressBarColor.newValue;
          // Update existing progress bars
          document.querySelectorAll('.progress-bar > div').forEach(bar => {
            bar.style.backgroundColor = progressBarColor;
          });
        }
      });
  
      // Run the function initially and periodically
      initializeProgressBars();
      setInterval(addProgressBars, 2000); // Adjust interval as needed
  
    }, delayInMilliseconds);
  })();
  