import * as functions from 'firebase-functions';

//Web scraping dependencies
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

// Google Assistant dependancies
import { dialogflow, SimpleResponse, BasicCard, Button, Image } from 'actions-on-google';

const app = dialogflow({ debug: true });

// Capture an intent

