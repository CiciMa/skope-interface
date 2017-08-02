// Import server startup through a single index entry point

import './register-api.js';

import { WebApp } from 'meteor/webapp';
import httpProxy from 'http-proxy';

const targetHost = 'http://localhost:4000';
const proxy = httpProxy.createProxyServer({});

// Listen to incoming HTTP requests (can only be used on the server).
WebApp.connectHandlers.use('/hello', (req, res, next) => {
  proxy.web(req, res, { target: targetHost });
});
