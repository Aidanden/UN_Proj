export const queryKeys = {
  departments: {
    all: ["departments"] as const,
    detail: (id: string) => ["departments", id] as const,
    
  },
  courses: {
    all: ["courses"] as const,
    detail: (id: string) => ["courses", id] as const,
  },
  instructors: {
    all: ["instructors"] as const,
    detail: (id: string) => ["instructors", id] as const,
  },
};
