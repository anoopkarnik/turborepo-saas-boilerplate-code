import { useState, useEffect } from 'react';

export function  useDeviceType(){
  const [deviceType, setDeviceType] = useState('desktop'); // Default to desktop

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;

      if (width <= 768) {
        setDeviceType('mobile'); // Mobile screen
      } else if (width > 768 && width <= 1024) {
        setDeviceType('tablet'); // Tablet screen
      } else {
        setDeviceType('desktop'); // Desktop screen
      }
    };

    // Initial check
    updateDeviceType();

    // Add event listener to update on window resize
    window.addEventListener('resize', updateDeviceType);

    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  return deviceType;
};