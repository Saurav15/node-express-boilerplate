/**
 * @module logger
 * This module provides a logger utility for logging messages with different log levels.
 */

import { createLogger, format, transports } from "winston";
import chalk from "chalk";

// Destructuring format from Winston
const { combine, timestamp, printf } = format;

// Define colors for different log levels
const chalkColor = {
  error: "red",
  warn: "yellow",
  info: "blue",
  verbose: "cyan",
  debug: "magenta",
  http: "green",
};


/**
 * Custom log format function.
 * @param {Object} logObject - Log entry object.
 * @returns {string} Formatted log entry as a string.
 */
const customFormat = printf(({ timestamp, level, message }) => {
  // Colorize log message based on log level
  const colouredMessage = chalk[chalkColor[level]](message);
  return `${timestamp} [${level}]: ${colouredMessage}`;
});

// Create a logger instance
const logger = createLogger({
  level: "http", // Set the default log level (can be configured)
  format: combine(timestamp(), customFormat), // Apply the custom log format
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: "app.log" }), // Log to a file named app.log
  ],
});

export default logger;
