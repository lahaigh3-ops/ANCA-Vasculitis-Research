# ANCA Vasculitis Research Setup Instructions

## Prerequisites
1. **Version Control System**: Ensure Git is installed on your machine.
2. **Development Environment**: Suitable IDE or code editor (e.g., Visual Studio Code, PyCharm).
3. **Python**: Ensure you have Python 3.x installed.
4. **Package Manager**: Install pip if it’s not already available.

## Cloning the Repository
First, clone the repository using the following command:
```bash
git clone https://github.com/lahaigh3-ops/ANCA-Vasculitis-Research.git
```

## Installation
Navigate into your project directory:
```bash
cd ANCA-Vasculitis-Research
```

1. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   ```
2. **Activate the virtual environment**:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application
To run the application, execute:
```bash
python main.py
```

## Testing

To run tests, use:
```bash
pytest
```

## Additional Notes
- Make sure to regularly pull from the main branch to keep your local repo updated:
  ```bash
  git pull origin main
  ```
- If you encounter any issues, check the Issues section of the GitHub repository for solutions or open a new issue.
