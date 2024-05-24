import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import {
  format,
  eachDayOfInterval,
  startOfToday,
  sub,
  isSameDay,
} from 'date-fns';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';
import useStore from '@/store/venueStore';

import { useState, useEffect } from 'react';

export function DatePicker() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const { setBookingDateRange, venue } = useStore();
  const [disabledDays, setDisabledDays] = useState<Date[]>([]);

  useEffect(() => {
    if (venue) {
      // Generate booked dates
      const bookings = venue.bookings.flatMap((booking): Date[] =>
        eachDayOfInterval({
          start: new Date(booking.dateFrom),
          end: sub(new Date(booking.dateTo), { days: 1 }),
        }),
      );

      // Generate past dates up to today
      const pastDates = eachDayOfInterval({
        start: new Date(2024, 0, 1), // Start from an arbitrary past date
        end: startOfToday(),
      });

      // Combine booked dates with past dates
      setDisabledDays([...bookings, ...pastDates]);
    }
  }, [venue]);

  useEffect(() => {
    setBookingDateRange(
      date as { from: Date | undefined; to: Date | undefined },
    );
  }, [date, setBookingDateRange]);

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              if (range?.from) {
                if (range?.to) {
                  // Check if the selected range includes any disabled days
                  const selectedDays = eachDayOfInterval({
                    start: range.from,
                    end: range.to,
                  });
                  const includesDisabledDay = selectedDays.some((day) =>
                    disabledDays.some((disabledDay) =>
                      isSameDay(day, disabledDay),
                    ),
                  );

                  // Only update the date state if the selected range does not include any disabled days
                  if (!includesDisabledDay) {
                    setDate(range);
                  }
                } else {
                  // Update the date state as soon as from is defined
                  setDate(range);
                }
              }
            }}
            numberOfMonths={2}
            showOutsideDays={false}
            disabled={disabledDays}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker;
