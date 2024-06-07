export function extractCode(input: string) {
    // Remove the backticks and the `tsx` text from the input string
    return input
        .replace(/```tsx/g, "")
        .replace(/```/g, "")
        .trim();
}
