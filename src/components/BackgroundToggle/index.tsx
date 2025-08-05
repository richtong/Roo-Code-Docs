import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

export function BackgroundToggle() {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    // Load saved preference
    const savedPreference = localStorage.getItem('animatedBackgroundEnabled');
    if (savedPreference !== null) {
      setIsEnabled(savedPreference === 'true');
    }
  }, []);

  const handleToggle = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    localStorage.setItem('animatedBackgroundEnabled', String(newValue));
    
    // Reload the page to apply changes
    window.location.reload();
  };

  return (
    <button
      className={styles.toggleButton}
      onClick={handleToggle}
      title={isEnabled ? 'Disable animated background' : 'Enable animated background'}
      aria-label={isEnabled ? 'Disable animated background' : 'Enable animated background'}
    >
      {isEnabled ? '🎨' : '🚫'}
    </button>
  );
}