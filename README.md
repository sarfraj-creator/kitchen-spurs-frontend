##  Tech Stack

| Tool         | Purpose                          |
|--------------|----------------------------------|
| Next.js      | React framework with App Router  |
| TypeScript   | Type-safe frontend development   |
| Tailwind CSS | Utility-first styling            |
| shadcn/ui    | Accessible UI components         |
| Zod          | Schema validation for filters    |
| Axios        | API client for backend requests  |
| Chart.js     | Data visualization               |


### 1. Clone the repository

```bash
git clone https://github.com/sarfraj-creator/kitchen-spurs-frontend
cd restaurant-analytics-frontend
```

### Install dependencies
```bash
npm install

```

### Run Locally
```bash
npm run dev
Open http://localhost:3000 in your browser
```


```bash
Features
 Home Page (/)
 Top 3 restaurants by revenue

 Search, sort, and filter restaurant list

 “View Full Report” button for each restaurant

 Restaurant Trends (/restaurants/[id])
 Daily order count, revenue, average order value, peak hour

 Date range filter

 Peak hour filter

 Minimum order amount filter

 Zod validation for query params

 Loading skeletons and error states

 Fallback message when no data is found

```