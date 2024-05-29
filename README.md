# Project Exam 2

<img width="1470" alt="Screenshot 2024-05-29 at 19 01 01" src="https://github.com/alexdalene/project-exam-2/assets/111867370/c2e53f24-1ae9-4b34-912a-184cbe19c82a">

[![Build and Deploy](https://github.com/alexdalene/project-exam-2/actions/workflows/deploy.yml/badge.svg)](https://github.com/alexdalene/project-exam-2/actions/workflows/deploy.yml)

Take the skills learned over the last two years and take on an extensive project where the finished product should reflect the candidate’s general development capabilities, in addition to visual and technical skills.

## Holidaze

Find the perfect venue for you. Whether you're looking for a small cozy cabin or a grand mansion for you and all your friends, we've got the place for you!

## Tech Stack

This project is built with:

- **React**: For building the user interface.
- **React Router DOM**: To handle routing.
- **Zustand**: For state management.
- **shadcn/ui**: UI framework built with TypeScript and TailwindCSS.
- **TailwindCSS**: For styling.
- **TypeScript**: For strong typing.
- **Three.js & React Three Fiber**: For 3D effects.

### Continuous Integration and Continuous Deployment

- **GitHub Actions**: Automates workflows.
- **Husky**: For Git hooks.

### Testing

- **Cypress**: For end-to-end testing.

## Installation Guide

Follow these steps to install and run the project:

1. **Clone the repository:**

```sh
git clone https://github.com/alexdalene/project-exam-2.git
```

2. **Navigate into the project directory:**

```sh
cd project-exam-2
```

3. **Install the dependencies:**

```sh
npm install
```

4. **Start the development server**

```sh
npm run dev
```

5. **To build the project, use the build script**

```sh
npm run build
```

6. **To preview the built project, use the preview script**

```sh
npm run preview
```

## Key Decisions

### Styling Framework

Opted for **shadcn/ui** as it's built with TypeScript and TailwindCSS, seamlessly integrating with the rest of the tech stack.

### Venue Manager

The user interface does not expose venue management directly. Users automatically gain venue management capabilities when they create a venue, simplifying the user experience.

### Pagination

Pagination is hidden when searching or sorting because of the API specifics.

### Hosting

Switched from Netlify to Vercel due to compatibility issues with Bun as the node runtime.
