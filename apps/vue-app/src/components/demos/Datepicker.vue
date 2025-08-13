<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Datepicker Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Datepicker -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Datepicker</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkDatepicker
              label="Select Date"
              placeholder="Choose a date"
              date-format="dd/MM/yyyy"
              v-model="basicDate"
            />
            <TkDatepicker
              label="Start Date"
              placeholder="Select start date"
              date-format="yyyy-MM-dd"
              v-model="startDate"
            />
          </div>
          <div class="mt-2 text-sm text-gray-600">
            Selected Date: {{ basicDate || 'Not selected' }} | Start Date: {{ startDate || 'Not selected' }}
          </div>
        </div>

        <!-- Date Range Selection -->
        <div>
          <h3 class="text-lg font-medium mb-3">Date Range Selection</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkDatepicker
              mode="range"
              label="Select Date Range"
              placeholder="Start date - End date"
              v-model="dateRange"
            />
            <TkDatepicker
              mode="range"
              label="Vacation Dates"
              placeholder="Check-in - Check-out"
              date-format="dd/MM/yyyy"
              v-model="vacationRange"
            />
          </div>
          <div class="mt-2 text-sm text-gray-600">
            Date Range: {{ dateRange ? `${dateRange.start} - ${dateRange.end}` : 'Not selected' }}
          </div>
        </div>

        <!-- Time Picker Integration -->
        <div>
          <h3 class="text-lg font-medium mb-3">Date & Time Picker</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkDatepicker
              label="Select Date & Time"
              placeholder="YYYY-MM-DD HH:mm"
              show-time-picker
              v-model="dateTime"
            />
            <TkDatepicker
              mode="range"
              label="Meeting Time Range"
              placeholder="Start time - End time"
              show-time-picker
              v-model="meetingRange"
            />
          </div>
          <div class="mt-2 text-sm text-gray-600">
            Date & Time: {{ dateTime || 'Not selected' }}
          </div>
        </div>

        <!-- Different Date Formats -->
        <div>
          <h3 class="text-lg font-medium mb-3">Different Date Formats</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkDatepicker
              label="DD/MM/YYYY Format"
              placeholder="31/12/2023"
              date-format="dd/MM/yyyy"
              v-model="ddmmFormat"
            />
            <TkDatepicker
              label="MM/DD/YYYY Format"
              placeholder="12/31/2023"
              date-format="MM/dd/yyyy"
              v-model="mmddFormat"
            />
            <TkDatepicker
              label="Month Name Format"
              placeholder="December 31, 2023"
              date-format="MMM d, yyyy"
              v-model="monthNameFormat"
            />
            <TkDatepicker
              label="Full Date Format"
              placeholder="Sunday, December 31, 2023"
              date-format="EEEE, MMMM d, yyyy"
              v-model="fullDateFormat"
            />
          </div>
        </div>

        <!-- Localization -->
        <div>
          <h3 class="text-lg font-medium mb-3">Localization</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkDatepicker
              label="English (US)"
              placeholder="Select date"
              locale="en-US"
              date-format="MMM d, yyyy"
              v-model="enDate"
            />
            <TkDatepicker
              label="Turkish"
              placeholder="Tarih seçin"
              locale="tr-TR"
              date-format="dd.MM.yyyy"
              v-model="trDate"
            />
            <TkDatepicker
              label="German"
              placeholder="Datum auswählen"
              locale="de-DE"
              date-format="dd.MM.yyyy"
              v-model="deDate"
            />
            <TkDatepicker
              label="French"
              placeholder="Sélectionner une date"
              locale="fr-FR"
              date-format="dd/MM/yyyy"
              v-model="frDate"
            />
          </div>
        </div>

        <!-- Min/Max Dates -->
        <div>
          <h3 class="text-lg font-medium mb-3">Date Restrictions</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkDatepicker
              label="Future Dates Only"
              placeholder="Select future date"
              :min-date="todayDate"
              v-model="futureDate"
              hint="Only future dates are allowed"
            />
            <TkDatepicker
              label="Past Dates Only"
              placeholder="Select past date"
              :max-date="todayDate"
              v-model="pastDate"
              hint="Only past dates are allowed"
            />
            <TkDatepicker
              label="This Year Only"
              placeholder="Select date this year"
              :min-date="yearStart"
              :max-date="yearEnd"
              v-model="thisYearDate"
              hint="Only this year's dates allowed"
            />
            <TkDatepicker
              label="Next 30 Days"
              placeholder="Select within 30 days"
              :min-date="todayDate"
              :max-date="next30Days"
              v-model="next30Date"
              hint="Next 30 days only"
            />
          </div>
        </div>

        <!-- Disabled Dates -->
        <div>
          <h3 class="text-lg font-medium mb-3">Disabled Dates</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkDatepicker
              label="Weekends Disabled"
              placeholder="Select a weekday"
              date-format="dd/MM/yyyy"
              :disabled-week-days="[0, 6]"
              v-model="weekdayDate"
              hint="Weekends are disabled"
            />
            <TkDatepicker
              label="Specific Dates Disabled"
              placeholder="Choose a date"
              date-format="dd/MM/yyyy"
              :disabled-dates="disabledSpecificDates"
              v-model="specificDate"
              hint="Some specific dates are disabled"
            />
            <TkDatepicker
              label="Only Allowed Dates"
              placeholder="Choose from allowed dates"
              date-format="dd/MM/yyyy"
              :allowed-dates="allowedSpecificDates"
              v-model="allowedDate"
              hint="Only specific dates are allowed"
            />
          </div>
        </div>

        <!-- Time Configurations -->
        <div>
          <h3 class="text-lg font-medium mb-3">Time Configurations</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkDatepicker
              label="24 Hour Format"
              placeholder="Select time"
              show-time-picker
              time-format="24"
              v-model="time24Format"
            />
            <TkDatepicker
              label="12 Hour Format"
              placeholder="Select time"
              show-time-picker
              time-format="12"
              v-model="time12Format"
            />
            <TkDatepicker
              label="Custom Time Steps"
              placeholder="15-minute intervals"
              show-time-picker
              :hour-step="1"
              :minute-step="15"
              v-model="timeStepDate"
              hint="15-minute intervals"
            />
            <TkDatepicker
              label="Time Range Restriction"
              placeholder="Business hours only"
              show-time-picker
              min-time="09:00"
              max-time="17:00"
              v-model="businessHours"
              hint="9 AM to 5 PM only"
            />
          </div>
        </div>

        <!-- First Day of Week -->
        <div>
          <h3 class="text-lg font-medium mb-3">First Day of Week</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkDatepicker
              label="Monday First (Default)"
              placeholder="Choose a date"
              date-format="dd/MM/yyyy"
              v-model="mondayFirst"
            />
            <TkDatepicker
              label="Sunday First"
              placeholder="Choose a date"
              date-format="dd/MM/yyyy"
              :first-day-of-week-index="6"
              v-model="sundayFirst"
            />
            <TkDatepicker
              label="Thursday First"
              placeholder="Choose a date"
              date-format="dd/MM/yyyy"
              :first-day-of-week-index="3"
              v-model="thursdayFirst"
            />
          </div>
        </div>

        <!-- Inline Datepicker -->
        <div>
          <h3 class="text-lg font-medium mb-3">Inline Datepicker</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-md font-medium mb-2">Single Date Selection</h4>
              <TkDatepicker
                v-model="inlineDate"
                inline
              />
              <div class="mt-2 text-sm text-gray-600">
                Selected: {{ inlineDate || 'Not selected' }}
              </div>
            </div>
            <div>
              <h4 class="text-md font-medium mb-2">Range Selection</h4>
              <TkDatepicker
                mode="range"
                v-model="inlineRange"
                inline
              />
              <div class="mt-2 text-sm text-gray-600">
                Range: {{ inlineRange ? `${inlineRange.start} - ${inlineRange.end}` : 'Not selected' }}
              </div>
            </div>
          </div>
        </div>

        <!-- States and Validation -->
        <div>
          <h3 class="text-lg font-medium mb-3">States and Validation</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkDatepicker
              label="Required Field"
              placeholder="Required date"
              show-asterisk
              v-model="requiredDate"
              :error="!requiredDate ? 'This field is required' : ''"
            />
            <TkDatepicker
              label="Disabled Datepicker"
              placeholder="Disabled"
              disabled
              v-model="disabledDate"
            />
            <TkDatepicker
              label="Invalid State"
              placeholder="Invalid date"
              invalid
              error="Please select a valid date"
              v-model="invalidDate"
            />
            <TkDatepicker
              label="Clearable Field"
              placeholder="Can be cleared"
              clearable
              v-model="clearableDate"
            />
          </div>
        </div>

        <!-- Header Types -->
        <div>
          <h3 class="text-lg font-medium mb-3">Different Header Types</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkDatepicker
              label="Basic Header"
              placeholder="Select date"
              header-type="basic"
              v-model="basicHeaderDate"
            />
            <TkDatepicker
              label="Primary Header"
              placeholder="Select date"
              header-type="primary"
              v-model="primaryHeaderDate"
            />
            <TkDatepicker
              label="Dark Header"
              placeholder="Select date"
              header-type="dark"
              v-model="darkHeaderDate"
            />
            <TkDatepicker
              label="Light Header"
              placeholder="Select date"
              header-type="light"
              v-model="lightHeaderDate"
            />
          </div>
        </div>

        <!-- Custom Footer -->
        <div>
          <h3 class="text-lg font-medium mb-3">Custom Footer Actions</h3>
          <div class="max-w-md">
            <TkDatepicker
              ref="customFooterPicker"
              label="Date with Custom Footer"
              placeholder="Select date"
              inline
              v-model="customFooterDate"
            >
              <template #footer-actions>
                <div class="flex justify-between w-full">
                  <TkButton label="Today" type="filled" variant="secondary" @tk-click="setToday" />
                  <div class="flex gap-2">
                    <TkButton label="Clear" type="text" variant="neutral" @tk-click="clearDate" />
                    <TkButton label="Apply" @tk-click="applyDate" />
                  </div>
                </div>
              </template>
            </TkDatepicker>
          </div>
        </div>

        <!-- Real-world Examples -->
        <div>
          <h3 class="text-lg font-medium mb-3">Real-world Examples</h3>
          <div class="space-y-4">
            <div class="border p-4 rounded-lg">
              <h4 class="font-semibold mb-3">Booking Form</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TkDatepicker
                  label="Check-in Date"
                  placeholder="Select check-in"
                  :min-date="todayDate"
                  v-model="checkinDate"
                  show-asterisk
                />
                <TkDatepicker
                  label="Check-out Date"
                  placeholder="Select check-out"
                  :min-date="checkinDate || todayDate"
                  v-model="checkoutDate"
                  show-asterisk
                />
                <div class="flex items-end">
                  <div class="w-full">
                    <label class="block text-sm font-medium mb-1">Total Nights</label>
                    <div class="px-3 py-2 border rounded bg-gray-50">
                      {{ calculateNights }} nights
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border p-4 rounded-lg">
              <h4 class="font-semibold mb-3">Event Planning</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TkDatepicker
                  label="Event Date"
                  placeholder="Select event date"
                  :min-date="todayDate"
                  show-time-picker
                  v-model="eventDate"
                  show-asterisk
                />
                <TkDatepicker
                  label="Registration Deadline"
                  placeholder="Registration deadline"
                  :min-date="todayDate"
                  :max-date="eventDate"
                  v-model="registrationDeadline"
                  show-asterisk
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Datepicker Demo</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Mode</label>
                <select v-model="selectedMode" class="w-full px-3 py-2 border rounded">
                  <option value="single">Single</option>
                  <option value="range">Range</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Date Format</label>
                <select v-model="selectedFormat" class="w-full px-3 py-2 border rounded">
                  <option value="dd/MM/yyyy">DD/MM/YYYY</option>
                  <option value="MM/dd/yyyy">MM/DD/YYYY</option>
                  <option value="yyyy-MM-dd">YYYY-MM-DD</option>
                  <option value="MMM d, yyyy">Mon D, YYYY</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Locale</label>
                <select v-model="selectedLocale" class="w-full px-3 py-2 border rounded">
                  <option value="en-US">English (US)</option>
                  <option value="tr-TR">Turkish</option>
                  <option value="de-DE">German</option>
                  <option value="fr-FR">French</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Header Type</label>
                <select v-model="selectedHeaderType" class="w-full px-3 py-2 border rounded">
                  <option value="basic">Basic</option>
                  <option value="primary">Primary</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>
            <div class="flex gap-4">
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="showTimePicker" class="rounded">
                Show Time Picker
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isInline" class="rounded">
                Inline Display
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isClearable" class="rounded">
                Clearable
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="disableWeekends" class="rounded">
                Disable Weekends
              </label>
            </div>
            <div class="max-w-md">
              <TkDatepicker
                label="Interactive Demo"
                placeholder="Test your configuration"
                :mode="selectedMode"
                :date-format="selectedFormat"
                :locale="selectedLocale"
                :header-type="selectedHeaderType"
                :show-time-picker="showTimePicker"
                :inline="isInline"
                :clearable="isClearable"
                :disabled-week-days="disableWeekends ? [0, 6] : []"
                v-model="interactiveDate"
              />
              <div class="mt-2 text-sm text-gray-600">
                Selected: {{ interactiveDate || 'Not selected' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TkCard, TkDatepicker, TkButton } from '@takeoff-ui/vue';

// Helper function to format date
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

const today = new Date();
const todayDate = formatDate(today);
const yearStart = `${today.getFullYear()}-01-01`;
const yearEnd = `${today.getFullYear()}-12-31`;
const future30 = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
const next30Days = formatDate(future30);

// Basic dates
const basicDate = ref('');
const startDate = ref('');

// Date ranges
const dateRange = ref({ start: '', end: '' });
const vacationRange = ref({ start: '', end: '' });

// Date time
const dateTime = ref('');
const meetingRange = ref({ start: '', end: '' });

// Different formats
const ddmmFormat = ref('');
const mmddFormat = ref('');
const monthNameFormat = ref('');
const fullDateFormat = ref('');

// Localization
const enDate = ref('');
const trDate = ref('');
const deDate = ref('');
const frDate = ref('');

// Date restrictions
const futureDate = ref('');
const pastDate = ref('');
const thisYearDate = ref('');
const next30Date = ref('');

// Disabled dates
const weekdayDate = ref('');
const specificDate = ref('');
const allowedDate = ref('');

// Generate some specific dates for examples
const disabledSpecificDates = ref([
  formatDate(new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000)),
  formatDate(new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000)),
  formatDate(new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000)),
]);

const allowedSpecificDates = ref([
  formatDate(new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)),
  formatDate(new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)),
  formatDate(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)),
]);

// Time configurations
const time24Format = ref('');
const time12Format = ref('');
const timeStepDate = ref('');
const businessHours = ref('');

// First day of week
const mondayFirst = ref('');
const sundayFirst = ref('');
const thursdayFirst = ref('');

// Inline datepickers
const inlineDate = ref('');
const inlineRange = ref({ start: '', end: '' });

// States
const requiredDate = ref('');
const disabledDate = ref('');
const invalidDate = ref('');
const clearableDate = ref('');

// Header types
const basicHeaderDate = ref('');
const primaryHeaderDate = ref('');
const darkHeaderDate = ref('');
const lightHeaderDate = ref('');

// Custom footer
const customFooterDate = ref('');
const customFooterPicker = ref();

// Real-world examples
const checkinDate = ref('');
const checkoutDate = ref('');
const eventDate = ref('');
const registrationDeadline = ref('');

// Interactive demo controls
const selectedMode = ref('single');
const selectedFormat = ref('dd/MM/yyyy');
const selectedLocale = ref('en-US');
const selectedHeaderType = ref('basic');
const showTimePicker = ref(false);
const isInline = ref(false);
const isClearable = ref(false);
const disableWeekends = ref(false);
const interactiveDate = ref('');

// Computed values
const calculateNights = computed(() => {
  if (!checkinDate.value || !checkoutDate.value) return 0;
  const checkin = new Date(checkinDate.value);
  const checkout = new Date(checkoutDate.value);
  const diffTime = Math.abs(checkout - checkin);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Methods for custom footer
const setToday = async () => {
  await customFooterPicker.value?.$el?.setToday();
};

const clearDate = () => {
  customFooterDate.value = '';
};

const applyDate = () => {
  console.log('Date applied:', customFooterDate.value);
};
</script>
