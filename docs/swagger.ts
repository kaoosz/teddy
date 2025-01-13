import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Monorepo APIs',
      version: '1.0.0',
      description: 'API documentation for my monorepo',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'URL API',
      },
      {
        url: 'http://localhost:3001',  
        description: 'User Auth API',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer', 
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },

  // apis: ['../users-service/src/swagger-docs/*.ts',"../url-service/src/swagger-docs/*ts"],
  apis: [
    './users-service-swagger-docs/*.ts',
    './url-service-swagger-docs/*.ts'
  ]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;