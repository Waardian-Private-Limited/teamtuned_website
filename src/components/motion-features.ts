// Animation features for LazyMotion, loaded after first paint so they stay out of the initial bundle.
// domMax (not domAnimation) because the Playground uses drag and layout animations.
import { domMax } from 'framer-motion';

export default domMax;
