# asm-formatter

A VS Code extension that formats x86-64 AT&T-style `.s` assembly files.

## Features

- Consistent tab indentation
- Normalized comments (always prefixed with `#`)
- Removes extra blank lines after labels
- Preserves assembler directives and label formatting

## Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/<HanzDaoang>/asm-formatter.git
   cd asm-formatter
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Launch in VS Code**
   - Open this folder in VS Code
   - Press F5 to start the Extension Development Host

> **Optional**: to package and install a `.vsix` locally:
>
> ```bash
> npx vsce package
> code --install-extension asm-formatter-0.0.1.vsix
> ```

## Usage

1. Open any `.s` or `.S` file in VS Code.
2. Run **Format Document**:
   - macOS: ⇧⌥F
   - **macOS**: <kbd>Shift+Option+F</kbd>

> If you have another formatter (e.g. Prettier) bound to a shortcut, you can always invoke the command palette:  
> <kbd>Ctrl+Shift+P</kbd> (or <kbd>Cmd+Shift+P</kbd> on macOS) → **Format Document**

## Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/awesome`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to your fork (`git push origin feature/awesome`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
