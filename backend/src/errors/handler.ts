import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  if (err instanceof ValidationError) {
    let errors: ValidationErrors = {};

    err.inner.forEach(e => {
      errors[e.path] = e.errors;
    });

    return res.status(400).json({ msg: 'Validation fails', errors });
  }

  console.error(err);

  return res.status(500).json({ msg: 'Internal server error' });
};

export default errorHandler;
