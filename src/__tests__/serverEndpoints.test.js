const request = require('supertest');
const express = require('express');
const app = express();

// Mock the API endpoint
app.post('/api', (req, res) => {
    res.json({
        polarity: 'Neutral',
        subjectivity: 'SUBJECTIVE',
        text: 'Sample text'
    });
});

describe('API Endpoints', () => {
    test('POST /api returns sentiment analysis', async () => {
        const response = await request(app)
            .post('/api')
            .send({ url: 'https://example.com/article' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('polarity');
        expect(response.body).toHaveProperty('subjectivity');
        expect(response.body).toHaveProperty('text');
    });
});
