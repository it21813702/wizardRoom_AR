// filepath: c:\Users\kirusanth\Desktop\wizardRoom_AR\script.js
// Simple startup logic for the demo
window.addEventListener('load', () => {
  console.log('WizardRoom AR Demo initialized');
  
  // Register a custom component for sound handling
  AFRAME.registerComponent('sound-component', {
    schema: {
      src: {type: 'selector'},
    },
    
    init: function() {
      this.audio = this.data.src;
      this.el.addEventListener('markerFound', () => {
        // Play sound when marker is found
        if (this.audio) {
          this.audio.currentTime = 0; // Reset the audio to start
          this.audio.play().catch(error => {
            console.warn('Audio play failed:', error);
          });
        }
      });
    }
  });
  
  // Get references to your marker entities
  const markers = document.querySelectorAll('a-marker');
  
  // Track which markers have been detected
  const detectedMarkers = {};
  
  // Handle all markers
  markers.forEach(marker => {
    const markerId = marker.id || marker.getAttribute('url') || 'unknown';
    
    // When marker is found
    marker.addEventListener('markerFound', () => {
      console.log(`Marker found: ${markerId}`);
      
      // Remember that this marker was detected
      detectedMarkers[markerId] = true;
      
      // Make the marker's content visible
      Array.from(marker.children).forEach(child => {
        child.setAttribute('visible', true);
      });
    });
    
    // When marker is lost
    marker.addEventListener('markerLost', () => {
      console.log(`Marker lost: ${markerId}`);
      
      // If we've previously detected this marker, keep its content visible
      if (detectedMarkers[markerId]) {
        Array.from(marker.children).forEach(child => {
          // Keep the child visible even when marker is lost
          child.setAttribute('visible', true);
        });
      }
    });
  });
});