# Notice Board Application

## Project Overview

The **Notice Board Application** is a centralized communication hub designed to streamline internal announcements within an organization. It provides a digital space where administrators and authorized personnel can publish important updates, while employees can easily access, filter, and view notices relevant to them.

The application focuses on a clean, modern user experience, ensuring that critical information is accessible, organized, and timely. It supports rich notice creation with attachments and precise targeting (departments or specific individuals).

## Key Functionalities

### 1. Dashboard & Notice Viewing

- **Paginated List**: Notices are displayed in a clean, paginated table format for easy browsing.
- **Status Indicators**: Clear visual cues for 'Published' and 'Draft' notices.
- **Detailed View**: Clickable notices open a detailed dialog view with complete information, including formatting text and downloadable attachments.

### 2. Advanced Filtering & Search

- **Status Filter**: Quickly toggle between 'Published', 'Draft', or 'All' notices.
- **Search**: Real-time search functionality to find notices by **Employee Name**, **Employee ID**, or **Notice Title**.
- **Date Filter**: Integrated calendar picker to filter notices by their specific publication date.

### 3. Notice Creation

- **Target Audience**: Flexible targeting options allow notices to be sent to **All Departments**, **Specific Departments**, or **Individual Employees**.
- **Rich Form Handling**: Comprehensive form with validation for titles, bodies, and types.
- **File Attachments**: Support for uploading multiple file attachments (images, documents) directly with the notice.
- **Draft Mode**: Save notices as drafts to be reviewed and published later.

### 4. Responsive & Interactive UI

- **Sidebar Navigation**: Collapsible and responsive sidebar logic that handles active states for parent and child routes intelligently.
- **Dynamic Topbar**: Displays current user context and dynamic greeting based on the time of day.
- **Optimized Layout**: Scroll-locked layout with dedicated scroll areas for main content, ensuring a polished app-like feel.

## Tech Stack

This project is built using a cutting-edge, type-safe web development stack:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Architecture**: [shadcn/ui](https://ui.shadcn.com/)
  - Built on [Radix UI](https://www.radix-ui.com/) primitives for accessibility.
  - Styled with [Tailwind CSS v4](https://tailwindcss.com/).
  - Uses [Lucide React](https://lucide.dev/) for consistent iconography.
- **Data Fetching & State**: [TanStack Query (React Query)](https://tanstack.com/query/latest) for efficient server-state management.
- **Form Management**: [React Hook Form](https://react-hook-form.com/) integrated with [Zod](https://zod.dev/) for robust schema validation.
- **Utilities**:
  - [date-fns](https://date-fns.org/) for modern date manipulation and formatting.
  - [Axios](https://axios-http.com/) for HTTP requests.

## Installation Steps

To get the project running locally:

1. **Clone the repository:**

   ```bash
   git clone [repository-url]
   cd notice-board-frontend
   ```

2. **Install dependencies:**
   This project uses `pnpm`.

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   ```

4. **Access the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

To create a production build:

```bash
pnpm build
pnpm start
```
