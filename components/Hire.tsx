import React from 'react';
import SectionHead from './SectionHead';
import Services from './Services';
import Booking from './Booking';

/** Everything about working together in one place: what I build (#services), then the calendar (#book). */
const Hire: React.FC = () => (
  <section id="hire" className="sec">
    <div className="wrap">
      <SectionHead eyebrow="Hire me" title="What we could build" />
      <Services />
      <Booking />
    </div>
  </section>
);

export default Hire;
