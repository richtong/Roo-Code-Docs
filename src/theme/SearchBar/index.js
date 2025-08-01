import React, { useEffect, useRef } from 'react';
import OriginalSearchBar from '@theme-original/SearchBar';

export default function SearchBarWrapper(props) {
  const searchBarRef = useRef(null);
  
  useEffect(() => {
    // Function to intercept and modify autocomplete behavior
    const interceptAutocomplete = () => {
      const searchInput = document.querySelector('.navbar__search-input');
      if (!searchInput) return;
      
      // Store reference to the input element
      searchBarRef.current = searchInput;
      
      // Check if autocomplete is initialized
      if (searchInput && searchInput.autocomplete) {
        const autocompleteInstance = searchInput.autocomplete;
        
        // Get the original getVal and setVal methods
        const originalGetVal = autocompleteInstance.getVal.bind(autocompleteInstance);
        const originalSetVal = autocompleteInstance.setVal.bind(autocompleteInstance);
        
        // Override getVal to process period-prefixed terms
        autocompleteInstance.getVal = function() {
          const val = originalGetVal();
          return processQuery(val);
        };
        
        // Also intercept the dropdown's source function if possible
        if (autocompleteInstance.dropdown && autocompleteInstance.dropdown.datasets) {
          autocompleteInstance.dropdown.datasets.forEach(dataset => {
            if (dataset.source) {
              const originalSource = dataset.source;
              dataset.source = function(query, cb) {
                // Process the query before sending to search
                const processedQuery = processQuery(query);
                return originalSource.call(this, processedQuery, cb);
              };
            }
          });
        }
      }
    };
    
    // Function to process queries with period-prefixed terms
    const processQuery = (query) => {
      if (!query) return query;
      
      // Check if the query contains period-prefixed terms like .gitignore or .rooignore
      const periodPrefixedPattern = /\B\.\w+/g;
      const matches = query.match(periodPrefixedPattern);
      
      if (matches && matches.length > 0) {
        // For each period-prefixed term, add an OR clause with the term without period
        let processedQuery = query;
        
        matches.forEach(match => {
          const termWithoutPeriod = match.substring(1); // Remove the leading period
          // Replace the term with an OR expression
          processedQuery = processedQuery.replace(
            match,
            `(${match} OR ${termWithoutPeriod})`
          );
        });
        
        return processedQuery;
      }
      
      return query;
    };
    
    // Try to intercept immediately
    interceptAutocomplete();
    
    // Also set up a MutationObserver to catch when the search bar is added to DOM
    const observer = new MutationObserver(() => {
      interceptAutocomplete();
    });
    
    // Observe the navbar for changes
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      observer.observe(navbar, { childList: true, subtree: true });
    }
    
    // Set up periodic checks as a fallback
    const intervalId = setInterval(interceptAutocomplete, 500);
    
    // Clean up after 10 seconds
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      observer.disconnect();
    }, 10000);
    
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);
  
  return <OriginalSearchBar {...props} />;
}