const frontPrefix = "%c";
const backPrefix = "\x1b";
const resetColorOnNode = "\x1b[0m";
const isNode = typeof process === "object";
let minimumLevelLog = +process.env.MINIMUM_LEVEL_LOG;;
let configValues;

/**
 * Method to set the config file
 */
const setConfig = (config) => {
  minimumLevelLog
  configValues = config;
};

/**
 * Method to retrive the data from the config file
 */
const readConfig = async (path = 'logger.json') => {
  let data;
  if (!isNode) {
    data = await fetch(path);
    data = await data.json();
  } else {
    const fs = require("fs").promises;
    data = await fs.readFile(path, "utf-8");
    data = JSON.parse(data);
  }
  setConfig(data);
};

/**
 * Function that return a true if is a string and false if
 * is a well formated JSON object
 * @param {json | string} str
 * @returns boolean
 */
const isString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * Function that will return a formated json or a string.
 * used for pretify JSON objects on the terminal.
 * @param {json | string} json
 * @returns string
 */
const syntaxHighlight = (json) => {
  if (!isString(json)) {
    return JSON.stringify(json, undefined, 2);
  } else {
    return json;
  }
};

/**
 * Method for print with style the message to the terminal.
 * @param {Number} type
 * @param {String} msg
 */
const logger = (type, msg) => {
  // We will ignore the logs if they do not exist and if they are outside the level of interest
  if (configValues === undefined) {
    readConfig().then((data) => {
      configValues = data;
      typeMessage(type, msg);
    });
  } else {
    typeMessage(type, msg);
  }
};

/**
 * Method for print with Error style the message to the terminal.
 * @param {Number} type
 * @param {String} msg
 */
const error = (msg) => {
  // We will ignore the logs if they do not exist and if they are outside the level of interest
  logger(0, msg);
};

/**
 * Method for print with warning style the message to the terminal.
 * @param {Number} type
 * @param {String} msg
 */
const warning = (msg) => {
  // We will ignore the logs if they do not exist and if they are outside the level of interest
  logger(1, msg);
};

/**
 * Method for print with debug style the message to the terminal.
 * @param {Number} type
 * @param {String} msg
 */
const debug = (msg) => {
  // We will ignore the logs if they do not exist and if they are outside the level of interest
  logger(2, msg);
};

/**
 * Method for print with info style the message to the terminal.
 * @param {Number} type
 * @param {String} msg
 */
const info = (msg) => {
  // We will ignore the logs if they do not exist and if they are outside the level of interest
  logger(3, msg);
};

/**
 * Method for print with data style the message to the terminal.
 * @param {Number} type
 * @param {String} msg
 */
const data = (msg) => {
  // We will ignore the logs if they do not exist and if they are outside the level of interest
  logger(4, msg);
};

/**
 * This function replace the prefix to the actual date
 * @param {string} header
 * @returns string
 */
const setHeaderDate = (header) => {
    return header.replace("##DATE##", new Date().toISOString());
};

/**
 * This method types the console.log message
 * and applies the styles/colors
 * @param {number} type
 * @param {string} msg
 */
const typeMessage = (type, msg) => {
  if (configValues[type] && type <= minimumLevelLog) {
    let formatedMessage = "";
    if (!isNode) {
      formatedMessage = `${frontPrefix}${setHeaderDate(
        configValues[type].header
      )} ${syntaxHighlight(msg)}`;
      console.log(formatedMessage, configValues[type].frontStyle);
    } else {
      formatedMessage = `${
        configValues[type].nodeFontColor.replace(/PREFIX/g, backPrefix)
      }${setHeaderDate(configValues[type].header)} ${syntaxHighlight(
        msg
      )} ${resetColorOnNode}`;
      console.log(formatedMessage);
    }
  }
};

((exports) => { 
  exports.logger = logger;
  exports.readConfig = readConfig;
  exports.error = error;
  exports.warning = warning;
  exports.debug = debug;
  exports.info = info;
  exports.data = data;
}) (typeof exports === 'undefined'? this['sampleModule']={}: exports); 
