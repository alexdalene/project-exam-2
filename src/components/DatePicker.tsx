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
  isSameDay,
  startOfYesterday,
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
          end: new Date(booking.dateTo),
        }),
      );

      // Generate past dates up to today
      const pastDates = eachDayOfInterval({
        start: new Date(2024, 0, 1), // Start from an arbitrary past date
        end: startOfYesterday(),
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

  const isValidRange = (
    range: DateRange | undefined,
    disabledDays: Date[],
  ): boolean => {
    if (range?.from && range?.to) {
      const selectedDays = eachDayOfInterval({
        start: range.from,
        end: range.to,
      });
      return !selectedDays.some((day) =>
        disabledDays.some((disabledDay) => isSameDay(day, disabledDay)),
      );
    }
    // If only from date is selected, it's a valid range
    else if (range?.from) {
      return true;
    }
    // If both from and to dates are not defined, it's a valid range
    return true;
  };

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'h-12 max-w-[300px] justify-start text-left font-normal',
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
              if (isValidRange(range, disabledDays)) {
                setDate(range);
              }
            }}
            numberOfMonths={2}
            showOutsideDays={false}
            disabled={disabledDays}
            min={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker;
