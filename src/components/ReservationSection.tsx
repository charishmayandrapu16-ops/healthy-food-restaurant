import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle, Sparkles, MapPin } from 'lucide-react';
import { ReservationData } from '../types/restaurant';

const TIME_SLOTS = [
  '11:30 AM', '12:15 PM', '1:00 PM', '1:45 PM',
  '5:15 PM', '6:00 PM', '6:45 PM', '7:30 PM', '8:15 PM'
];

const SEATING_AREAS = [
  { id: 'patio', name: 'Botanical Garden Patio', desc: 'Open-air courtyard with lemon trees and solar heated banquettes' },
  { id: 'greenhouse', name: 'Living Greenhouse Room', desc: 'Surrounded by indoor olive trees and natural sunlight' },
  { id: 'indoor', name: 'Artisan Dining Hall', desc: 'Rustic stone arches, handcrafted oak tables, intimate acoustic warmth' },
  { id: 'chef_counter', name: 'Culinary Open Hearth', desc: 'Front-row view of the live fire kitchen and chef assembly' },
];

export const ReservationSection: React.FC = () => {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    email: '',
    phone: '',
    date: '2026-10-02',
    time: '6:45 PM',
    guests: 2,
    seatingArea: 'greenhouse',
    dietaryNotes: '',
  });

  const [confirmedBooking, setConfirmedBooking] = useState<{
    data: ReservationData;
    bookingCode: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    const bookingCode = `VRD-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedBooking({
      data: { ...formData },
      bookingCode,
    });
  };

  const handleReset = () => {
    setConfirmedBooking(null);
  };

  return (
    <section id="reservations" className="py-16 md:py-24 bg-stone-100/60 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Dine In With Us
          </div>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl text-stone-900 tracking-tight text-balance">
            Reserve Your Table
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            Experience our mindful garden sanctuary. Complimentary sparkling alkaline water and raw crudités are served upon arrival.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation Success Card */
          <div className="max-w-2xl bg-white p-8 rounded-2xl border border-emerald-200 shadow-md space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-emerald-800">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
              <div>
                <h3 className="text-xl font-bold font-display text-stone-900">
                  Reservation Confirmed!
                </h3>
                <p className="text-xs text-stone-500">
                  Confirmation Code: <strong className="text-emerald-800 tabular-nums">{confirmedBooking.bookingCode}</strong>
                </p>
              </div>
            </div>

            <div className="bg-[#FAF9F5] p-5 rounded-xl border border-stone-200 space-y-3 text-xs text-stone-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-stone-400 block text-[11px] uppercase">Guest Name</span>
                  <span className="font-semibold text-stone-900">{confirmedBooking.data.name}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px] uppercase">Party Size</span>
                  <span className="font-semibold text-stone-900 tabular-nums">{confirmedBooking.data.guests} Guests</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px] uppercase">Date & Time</span>
                  <span className="font-semibold text-stone-900">{confirmedBooking.data.date} at {confirmedBooking.data.time}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px] uppercase">Seating Area</span>
                  <span className="font-semibold text-stone-900 capitalize">{confirmedBooking.data.seatingArea.replace('_', ' ')}</span>
                </div>
              </div>

              {confirmedBooking.data.dietaryNotes && (
                <div className="pt-2 border-t border-stone-200 text-stone-600">
                  <span className="text-stone-400 block text-[11px] uppercase">Dietary / Special Notes</span>
                  <span>{confirmedBooking.data.dietaryNotes}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              A calendar reminder and confirmation SMS have been dispatched to <strong>{confirmedBooking.data.phone}</strong>. We hold tables for 15 minutes past reservation time.
            </p>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              Book Another Reservation
            </button>
          </div>
        ) : (
          /* Interactive Booking Form */
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Form Controls (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
              
              {/* Date, Time, and Guests Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Select Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                {/* Guests */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Party Size</span>
                  </label>
                  <select
                    value={formData.guests}
                    onChange={e => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time slot summary */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Selected Slot</span>
                  </label>
                  <div className="px-3 py-2 text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg">
                    {formData.time}
                  </div>
                </div>

              </div>

              {/* Time Slots Strip */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Available Seating Times
                </span>
                <div className="flex flex-wrap gap-2">
                  {TIME_SLOTS.map(slot => {
                    const isSelected = formData.time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, time: slot })}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                          isSelected
                            ? 'bg-emerald-900 text-white font-semibold'
                            : 'bg-stone-50 text-stone-700 border border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Seating Area Selection */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  Atmosphere & Seating Area
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SEATING_AREAS.map(area => {
                    const isSelected = formData.seatingArea === area.id;
                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, seatingArea: area.id as any })}
                        className={`p-3 text-left rounded-xl border text-xs transition-all ${
                          isSelected
                            ? 'border-emerald-800 bg-emerald-50 text-emerald-950 font-semibold shadow-xs'
                            : 'border-stone-200 text-stone-700 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="font-semibold text-stone-900">{area.name}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5 leading-snug">{area.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Maya Hawthorne"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maya@example.com"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Mobile Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(415) 555-0192"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              {/* Dietary notes */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">
                  Dietary Restrictions or Special Occasions (Optional)
                </label>
                <input
                  type="text"
                  value={formData.dietaryNotes}
                  onChange={e => setFormData({ ...formData, dietaryNotes: e.target.value })}
                  placeholder="e.g., Celiac friendly, anniversary celebration"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg text-sm font-semibold text-white bg-emerald-900 hover:bg-emerald-800 transition-colors shadow-sm"
              >
                Confirm Table Reservation
              </button>

            </div>

            {/* Right Column: Restaurant Experience & Hours (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <h3 className="font-display text-lg font-bold text-stone-900">
                  The Verde Dining Sanctuary
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Located in the coastal heart of Pacific Grove. Every table is outfitted with natural linen napkins, recycled glassware, and live air-purifying botanical greenery.
                </p>

                <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                  <div className="flex items-start gap-2.5 text-stone-700">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>742 Evergreen Way, Pacific Grove, CA 93950</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-stone-700">
                    <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <div>Monday – Friday: 8:00 AM – 9:00 PM</div>
                      <div>Saturday – Sunday: 8:30 AM – 10:00 PM</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-semibold text-stone-900">Complimentary Dining Amenities:</div>
                  <ul className="text-xs text-stone-600 space-y-1 mt-1.5 list-disc pl-4">
                    <li>Chilled house electrolyte lemon infusion upon arrival</li>
                    <li>Full organic tea & matcha ceremonial service</li>
                    <li>Dedicated celiac-safe dedicated prep stations</li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-900 text-emerald-50 p-6 rounded-2xl shadow-sm space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  Private Gatherings & Wellness Retreats
                </div>
                <h4 className="font-display text-lg font-bold text-white">
                  Host Your Event in the Greenhouse
                </h4>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  We host private supper clubs, yoga brunch events, and corporate wellness dinners for up to 45 guests.
                </p>
                <div className="pt-2 text-xs font-medium text-emerald-200">
                  Call our events concierge: (831) 555-0144
                </div>
              </div>

            </div>

          </form>
        )}

      </div>
    </section>
  );
};
