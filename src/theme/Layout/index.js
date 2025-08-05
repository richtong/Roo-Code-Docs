import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import { AnimatedBackground } from '../../components/AnimatedBackground';
import { BackgroundToggle } from '../../components/BackgroundToggle';

export default function Layout(props) {
  return (
    <>
      <AnimatedBackground />
      <BackgroundToggle />
      <OriginalLayout {...props} />
    </>
  );
}