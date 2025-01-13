/**
 * 
 * 
 * @swagger
 * /url:
 *   post:
 *     summary: Create a new shortened URL
 *     tags: [URLs]
 *     security:
 *       - BearerAuth: [] # Define o esquema de autenticação opcional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL to shorten
 *                 example: "https://example.com/some-long-url"
 *     responses:
 *       201:
 *         description: URL shortened successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier for the shortened URL
 *                   example: "https://google.com"
 *                 shortUrl:
 *                   type: string
 *                   description: The shortened URL
 *                   example: "https://short.ly/abc123"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the validation error
 *                   example: "Invalid URL format"
 *       401:
 *         description: Unauthorized - authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Authentication error message
 *                   example: "Authentication required"
 *       403:
 *         description: Unauthorized - invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: if provide token invalid.
 *                   example: "Invalid token"
 */

/**
 * @swagger
 * /urls:
 *   get:
 *     summary: Get all shortened URLs for the authenticated user
 *     tags: [URLs]
 *     security:
 *       - BearerAuth: [] # Autenticação obrigatória com Bearer Token
 *     responses:
 *       200:
 *         description: Successfully retrieved URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the URL
 *                     example: "2"
 *                   shortUrl:
 *                     type: string
 *                     description: The shortened URL
 *                     example: "https://short.ly/abc123"
 *                   originalUrl:
 *                     type: string
 *                     description: The original URL
 *                     example: "https://example.com/some-long-url"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: When the URL was created
 *                     example: "2023-01-01T12:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: When the URL was last updated
 *                     example: "2023-01-02T12:00:00Z"
 *       401:
 *         description: Unauthorized - authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Authentication error message
 *                   example: "Authentication required"
 *       403:
 *         description: Unauthorized - invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Token validation failed
 *                   example: "Invalid token"
 */

/**
 * @swagger
 * /urls/{id}:
 *   put:
 *     summary: Update a shortened URL
 *     tags: [URLs]
 *     security:
 *       - BearerAuth: [] # Autenticação obrigatória com Bearer Token
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the URL to update
 *         schema:
 *           type: string
 *           example: "1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The new URL to replace the existing one
 *                 example: "https://example.com/updated-url"
 *     responses:
 *       200:
 *         description: URL updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Unique identifier for the URL
 *                   example: "3"
 *                 shortUrl:
 *                   type: string
 *                   description: The shortened URL
 *                   example: "https://short.ly/abc123"
 *                 originalUrl:
 *                   type: string
 *                   description: The updated original URL
 *                   example: "https://youtube.com"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the validation error
 *                   example: "Invalid URL format"
 *       401:
 *         description: Unauthorized - authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Authentication error message
 *                   example: "Authentication required"
 *       403:
 *         description: Unauthorized - invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Token validation failed
 *                   example: "Invalid token"
 *       404:
 *         description: URL not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: URL not found message
 *                   example: "URL not found"
 */

/**
 * @swagger
 * /urls/{id}:
 *   delete:
 *     summary: Delete a shortened URL
 *     tags: [URLs]
 *     security:
 *       - BearerAuth: [] # Autenticação obrigatória com Bearer Token
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the URL to delete
 *         schema:
 *           type: string
 *           example: "3"
 *     responses:
 *       200:
 *         description: URL deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "URL deleted successfully"
 *       401:
 *         description: Unauthorized - authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Authentication error message
 *                   example: "Authentication required"
 *       403:
 *         description: Forbidden - user is not the owner of the URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Authorization error message
 *                   example: "You do not have permission to delete this URL"
 *       404:
 *         description: URL not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: URL not found message
 *                   example: "URL not found"
 */
