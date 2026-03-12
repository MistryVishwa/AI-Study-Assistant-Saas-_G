import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, MapPin, ChevronLeft, ChevronRight, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, eachDayOfInterval } from 'date-fns';
import { cn } from '@/src/lib/utils';

export const StudyPlanner: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gold/10 text-gold rounded-2xl">
            <CalendarIcon size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
            <p className="text-white/40 text-sm">Plan your study sessions and exams.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
            <button 
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <button className="btn-gold flex items-center gap-2">
            <Plus size={18} />
            New Event
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 mb-4">
        {days.map((day, i) => (
          <div key={i} className="text-center text-xs font-bold text-white/20 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        days.push(
          <div
            key={day.toString()}
            className={cn(
              "h-32 glass border border-white/5 p-2 transition-all cursor-pointer hover:bg-white/5 relative group",
              !isSameMonth(day, monthStart) ? "opacity-20" : "",
              isSameDay(day, selectedDate) ? "bg-gold/5 border-gold/30" : ""
            )}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <span className={cn(
              "text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full",
              isSameDay(day, new Date()) ? "bg-gold text-black" : "text-white/60"
            )}>
              {formattedDate}
            </span>
            
            {/* Sample Events */}
            {isSameDay(day, addDays(new Date(), 2)) && (
              <div className="mt-2 p-1.5 bg-edu-blue/20 border border-edu-blue/30 rounded-lg text-[10px] font-bold text-edu-blue truncate">
                AI Ethics Exam
              </div>
            )}
            {isSameDay(day, addDays(new Date(), 5)) && (
              <div className="mt-2 p-1.5 bg-gold/20 border border-gold/30 rounded-lg text-[10px] font-bold text-gold truncate">
                Tutor Session
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="rounded-3xl overflow-hidden border border-white/10">{rows}</div>;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 animate-in fade-in duration-500">
      <div className="xl:col-span-3">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>

      <div className="space-y-8">
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-xl font-bold mb-6">Upcoming Events</h3>
          <div className="space-y-6">
            {[
              { title: 'AI Ethics Exam', date: 'March 13, 2026', time: '10:00 AM', type: 'exam' },
              { title: 'Biology Lab Report', date: 'March 15, 2026', time: '11:59 PM', type: 'deadline' },
              { title: 'AI Tutor Session', date: 'March 16, 2026', time: '04:00 PM', type: 'session' },
            ].map((event, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className={cn(
                  "w-1 h-12 rounded-full",
                  event.type === 'exam' ? 'bg-red-400' : event.type === 'deadline' ? 'bg-edu-blue' : 'bg-gold'
                )}></div>
                <div>
                  <h4 className="font-bold group-hover:text-gold transition-colors">{event.title}</h4>
                  <p className="text-xs text-white/40">{event.date} • {event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-8 rounded-3xl bg-gold/5 border-gold/20">
          <h3 className="text-xl font-bold text-gold mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} />
            Study Goals
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span>Weekly Progress</span>
                <span>75%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gold w-3/4 rounded-full"></div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              You're on track to finish your Biology module 2 days early! Keep it up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
