import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: { use: (arg0: string, arg1: any) => void }) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true
    })
  );
};
