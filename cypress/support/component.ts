import '@testing-library/cypress/add-commands'; // ✅ Adds Cypress commands for better testing
import { vi } from "vitest"; // ✅ Ensures Vitest is available in tests

// ✅ Automatically reset Vitest mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});
