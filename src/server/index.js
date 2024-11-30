const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('dist'));

app.post('/api', async (req, res) => {
    const url = req.body.url;

    try {
        // Get webpage content
        const pageResponse = await axios.get(url);
        const $ = cheerio.load(pageResponse.data);
        const extractedText = $('p, h1, h2, h3').map((_, el) => $(el).text()).get().join(' ');

        // MeaningCloud API call
        const meaningCloudResponse = await axios({
            method: 'POST',
            url: 'https://api.meaningcloud.com/sentiment-2.1',
            params: {
                key: process.env.MEANINGCLOUD_API_KEY,
                txt: extractedText.substring(0, 5000), // MeaningCloud has text length limits
                lang: 'en',
                model: 'general'
            }
        });

        const data = meaningCloudResponse.data;

        if (data.status.code !== '0') {
            throw new Error(data.status.msg);
        }

        res.json({
            polarity: getPolarityLabel(data.score_tag),
            subjectivity: data.subjectivity,
            text: data.sentence_list?.[0]?.text || extractedText.substring(0, 200),
            confidence: data.confidence
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Failed to analyze URL',
            details: error.message
        });
    }
});

function getPolarityLabel(score_tag) {
    const labels = {
        'P+': 'Strong positive',
        'P': 'Positive',
        'NEU': 'Neutral',
        'N': 'Negative',
        'N+': 'Strong negative',
        'NONE': 'Without sentiment'
    };
    return labels[score_tag] || 'Unknown';
}

app.listen(8000, () => console.log('Server running on http://localhost:8000'));
