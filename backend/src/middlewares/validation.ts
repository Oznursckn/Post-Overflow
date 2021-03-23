import { validate } from "class-validator";
import { RequestHandler } from "express";
import { plainToClass, ClassConstructor } from "class-transformer";
import { ApiValidationError } from "../config/ApiValidationError";

async function validateObject<T extends Object>(objectToValidate: T) {
  const errors = await validate(objectToValidate);

  if (errors.length > 0) {
    const constrains: string[] = [];

    errors.forEach((error) => {
      Object.keys(error.constraints).forEach((item) => {
        constrains.push(error.constraints[item]);
      });
    });

    throw new ApiValidationError(constrains);
  }
}

export function validation<T extends Object>(
  type: ClassConstructor<T>
): RequestHandler {
  return async (req, res, next) => {
    const objectToValidate: T = plainToClass(type, req.body);

    try {
      await validateObject(objectToValidate);
    } catch (error) {
      next(error);
      return;
    }

    next();
  };
}

export function queryValidation<T extends Object>(
  type: ClassConstructor<T>
): RequestHandler {
  return async (req, res, next) => {
    const objectToValidate: T = plainToClass(type, req.query);

    try {
      await validateObject(objectToValidate);
    } catch (error) {
      next(error);
      return;
    }

    next();
  };
}
