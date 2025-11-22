# What is DOCScout?

- DocScout is an AI‑powered research assistant designed to help users collect information from the internet while doing homework, academic research, or general investigation. It enhances web queries using Google dork techniques, allowing users to search for specific keywords, file types, and targeted information across various sites. DocScout intelligently rewrites and optimizes search queries, interprets search results, summarizes or rewrites long texts, and extracts structured data. It also allows users to save discovered documents, text, and search outputs into decentralized storage such as Walrus. Overall, DocScout acts as a smart, automation‑driven tool that accelerates information gathering and organizes research data efficiently.

# Development Guidelines

- This file reminds the development guides. Eg. you can execute it after **/clean** command.

## Form Validations

- Use always **yup** for form validations.

## Typing 

All type definitions in the project are located under the **resources/js/landing/@types** folder.

- Important Rules:

- We do NOT use import syntax for type definitions
- Type files are named with the .d.ts extension: [FILE_NAME].d.ts
- Types are globally available without explicit imports
- Example structure:

```
@types/
    ├── api.d.ts
    ├── oracle.d.ts
    ├── contract.d.ts
    └── user.d.ts
```

## React Query Usage

We use React Query for all API requests.

**Mandatory Requirements:**

- Always destructure data, isLoading, and isError from query results
- Handle all three states in your components
- Never use only data without handling loading and error states

```
const { data, isLoading, isError } = useQuery({
  queryKey: ['oracleData'],
  queryFn: fetchOracleData
});

if (isLoading) return <LoadingSpinner />;
if (isError) return <ErrorMessage />;
return <DataDisplay data={data} />;
```

## Component Structure

- Each section must be created as a separate component and imported into the relevant file.

- Use this path for components: **resources/js/landing/Components/cmr-prepare**

- Break down pages into logical sections

- Each section = separate component file

- Import sections into the main page/parent component

- Promote reusability and maintainability

### Example Structure:

```
import StatsSection from './components/StatsSection';
import OracleListSection from './components/OracleListSection';
import ActivitySection from './components/ActivitySection';

export default function Dashboard() {
  return (
    <div>
      <StatsSection />
      <OracleListSection />
      <ActivitySection />
    </div>
  );
}
```

- **CRITICAL:** NEVER define components inside other components

- ❌ NEVER DO THIS:

```
const A = () => {
  // DON'T define component B inside component A
  const B = () => {
    return <div>Inner Component</div>;
  };
  
  return <div><B /></div>;
};
```

- ✅ DO THIS INSTEAD:

```
// components/B.tsx
export default function B() {
  return <div>Inner Component</div>;
}

// components/A.tsx
import B from './B';

export default function A() {
  return <div><B /></div>;
}
```

### Why This Matters:

- ❌ Nested components recreate on every render (performance issue)
- ❌ Breaks React DevTools
- ❌ Lost component state on re-renders
- ✅ Each component in its own file maintains proper lifecycle
- ✅ Better performance and debugging
- ✅ Better code organization
- ✅ Easier testing and maintenance
- ✅ Component reusability
- ✅ Clearer separation of concerns

## Prop Definitions

- **NEVER** destructure object properties when passing props. Pass the entire object instead.

- ❌ DON'T DO THIS:

```
const object = {
  a: 'value1',
  b: 'value2',
  c: 'value3',
  d: 'value4'
};

<Component a={object.a} b={object.b} c={object.c} d={object.d} />
```

- ✅ DO THIS INSTEAD:

```
const object = {
  a: 'value1',
  b: 'value2',
  c: 'value3',
  d: 'value4'
};

<Component data={object} />
```

### Benefits

Benefits:

- Cleaner code
- Less repetition
- Easier refactoring
- Better prop management

## Conditional UI States

- Do not use inline JSX for rendering conditional UI states such as loading, error, or pending.
- Always use a clean control flow pattern:

- ❌ Avoid

```
{isError && <ErrorComponent />}
{isLoading && <LoadingComponent />}
{!isLoading && !isError && <Content />}
```

- ✅ Prefer

```

if (isError) {
  return <ErrorComponent />;
}

if (isLoading) {
  return <LoadingComponent />;
}

return <Content />;
```