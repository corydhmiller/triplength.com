# TripLength - Trip Duration Calculator

A modern, user-friendly web application for calculating travel duration between any two locations. Perfect for planning trips, flights, or any journey where you need to know exactly how long you'll be in transit, accounting for timezone differences and Daylight Saving Time (DST) automatically.

## ✨ Features

- **Accurate Duration Calculation**: Automatically handles timezone differences and Daylight Saving Time (DST) transitions using Luxon
- **City & Timezone Search**: Search for cities or select timezones directly with an intuitive autocomplete interface
- **Saved Timezones**: Save up to 5 frequently used timezones for quick access (stored in browser localStorage)
- **Smart Defaults**: Automatically pre-fills departure and arrival times with your current timezone
- **Modern UI**: Responsive, high-performance interface built with Tailwind CSS 4 and OKLCH color space
- **Type-Safe**: Fully written in TypeScript for reliability and developer experience
- **Fast Development**: Powered by Next.js 16 App Router and Turbopack for lightning-fast hot reload

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4 with OKLCH colors
- **Date/Time**: Luxon for timezone and DST handling
- **City Data**: city-timezones for location-based timezone lookup
- **Testing**: Jest with React Testing Library
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn (recommended) or npm

### Installation

Clone the repository and install dependencies:

```bash
yarn install
# or
npm install
```

### Development

Start the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
yarn build
# or
npm run build
```

### Start Production Server

```bash
yarn start
# or
npm start
```

### Linting

```bash
yarn lint
# or
npm run lint
```

## 🧪 Testing

Run the test suite:

```bash
yarn test
# or
npm test
```

The project includes comprehensive tests for:

- Duration calculation logic
- React components
- Custom hooks
- Form validation

## 🎯 How It Works

1. **Enter Departure Details**: Select the date, time, and timezone/city for your departure
2. **Enter Arrival Details**: Select the date, time, and timezone/city for your arrival
3. **Calculate**: Click the button to instantly see the exact duration of your trip
4. **Save Timezones**: Frequently used timezones can be saved for quick access (up to 5)

The calculator automatically handles:

- Timezone conversions
- Daylight Saving Time transitions
- Date boundaries (trips spanning multiple days)
- Invalid date/time combinations

## 📝 License

This project is licensed under the MIT License.
