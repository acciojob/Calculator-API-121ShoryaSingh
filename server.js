const app = require('./index.js');

app.use(express.json());

const MAX_VALUE = 1000000; // 10 lakhs (1 million)
const MIN_VALUE = -1000000; // -10 lakhs (-1 million)

// Helper function to validate inputs
function validateInputs(num1, num2, operation) {
  // Check if inputs are valid numbers
  if (
    typeof num1 !== 'number' ||
    typeof num2 !== 'number' ||
    isNaN(num1) ||
    isNaN(num2)
  ) {
    return { valid: false, message: 'Invalid data types' };
  }

  // Check for overflow/underflow in inputs
  if (num1 > MAX_VALUE || num2 > MAX_VALUE) {
    return { valid: false, message: 'Overflow' };
  }
  if (num1 < MIN_VALUE || num2 < MIN_VALUE) {
    return { valid: false, message: 'Underflow' };
  }

  // Check for division by zero
  if (operation === 'divide' && num2 === 0) {
    return { valid: false, message: 'Cannot divide by zero' };
  }

  return { valid: true };
}

// Helper function to check result overflow/underflow
function checkResultRange(result) {
  if (result > MAX_VALUE) {
    return { valid: false, message: 'Overflow' };
  }
  if (result < MIN_VALUE) {
    return { valid: false, message: 'Underflow' };
  }
  return { valid: true };
}

// GET - Home route
app.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});

// POST - Addition
app.post('/add', (req, res) => {
  try {
    const { num1, num2 } = req.body;

    // Validate inputs
    const validation = validateInputs(num1, num2, 'add');
    if (!validation.valid) {
      return res.status(200).json({
        status: 'error',
        message: validation.message,
      });
    }

    // Perform addition
    const sum = num1 + num2;

    // Check result range
    const resultCheck = checkResultRange(sum);
    if (!resultCheck.valid) {
      return res.status(200).json({
        status: 'error',
        message: resultCheck.message,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'the sum of given two numbers',
      sum: sum,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

// POST - Subtraction
app.post('/sub', (req, res) => {
  try {
    const { num1, num2 } = req.body;

    // Validate inputs
    const validation = validateInputs(num1, num2, 'sub');
    if (!validation.valid) {
      return res.status(200).json({
        status: 'error',
        message: validation.message,
      });
    }

    // Perform subtraction
    const difference = num1 - num2;

    // Check result range
    const resultCheck = checkResultRange(difference);
    if (!resultCheck.valid) {
      return res.status(200).json({
        status: 'error',
        message: resultCheck.message,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'the difference of given two numbers',
      difference: difference,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

// POST - Multiplication
app.post('/multiply', (req, res) => {
  try {
    const { num1, num2 } = req.body;

    // Validate inputs
    const validation = validateInputs(num1, num2, 'multiply');
    if (!validation.valid) {
      return res.status(200).json({
        status: 'error',
        message: validation.message,
      });
    }

    // Perform multiplication
    const result = num1 * num2;

    // Check result range
    const resultCheck = checkResultRange(result);
    if (!resultCheck.valid) {
      return res.status(200).json({
        status: 'error',
        message: resultCheck.message,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'The product of given numbers',
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

// POST - Division
app.post('/divide', (req, res) => {
  try {
    const { num1, num2 } = req.body;

    // Validate inputs (includes division by zero check)
    const validation = validateInputs(num1, num2, 'divide');
    if (!validation.valid) {
      return res.status(200).json({
        status: 'error',
        message: validation.message,
      });
    }

    // Perform division
    const result = num1 / num2;

    // Check result range
    const resultCheck = checkResultRange(result);
    if (!resultCheck.valid) {
      return res.status(200).json({
        status: 'error',
        message: resultCheck.message,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'The division of given numbers',
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

app.listen(3000, () => {
  console.log('server started');
});
