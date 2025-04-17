// extension.js
const vscode = require("vscode");

/**
 * Activate the ASM formatter extension.
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider("asm", {
      provideDocumentFormattingEdits(document) {
        const fullText = document.getText();
        const lines = fullText.split(/\r?\n/);
        const formattedLines = lines.map(formatLine);
        const output = [];

        for (const line of formattedLines) {
          const trimmed = line.trim();
          const last = output[output.length - 1] || "";
          const lastTrimmed = last.trim();

          // Skip blank lines after labels or consecutive blanks
          if (
            (trimmed === "" && /^[\w.]+:$/.test(lastTrimmed)) ||
            (trimmed === "" && lastTrimmed === "")
          ) {
            continue;
          }
          output.push(line);
        }

        const newText = output.join("\n");
        const fullRange = new vscode.Range(
          document.positionAt(0),
          document.positionAt(fullText.length)
        );
        return [vscode.TextEdit.replace(fullRange, newText)];
      },
    })
  );
}

/**
 * Clean up resources when deactivating the extension.
 */
function deactivate() {}

/**
 * Format a single line of AT&T-style assembly.
 * @param {string} line
 * @returns {string}
 */
const formatLine = (line) => {
  const trimmed = line.trim();

  // Full-line comment
  if (trimmed.startsWith("#") || trimmed.startsWith("//")) {
    const comment = trimmed.replace(/^#+|\/\//, "").trim();
    return `\t# ${comment}`;
  }

  // Assembler directive
  if (trimmed.startsWith(".")) {
    return trimmed;
  }

  // Label alone on line
  const labelMatch = line.match(/^(\s*)([\w.]+:)\s*$/);
  if (labelMatch) {
    return `${labelMatch[1]}${labelMatch[2]}`;
  }

  // Instruction with optional inline comment
  const commentIndex = line.indexOf("#");
  const code =
    commentIndex >= 0 ? line.slice(0, commentIndex).trimEnd() : trimmed;
  const rawComment = commentIndex >= 0 ? line.slice(commentIndex).trim() : "";
  const commentText = rawComment.replace(/^#+/, "").trim();

  const [instr, ...operands] = code.split(/\s+/);
  if (!instr) return line;

  let result = `\t${instr}${operands.length ? " " + operands.join(" ") : ""}`;
  if (commentText) {
    result += `  # ${commentText}`;
  }
  return result;
};

module.exports = { activate, deactivate };
