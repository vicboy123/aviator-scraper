import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://1win1.in/aviator/');
    const $ = cheerio.load(data);
    const multipliers = [];

    $('.recent-results span').each((_, el) => {
      const text = $(el).text().replace('x', '').trim();
      const num = parseFloat(text);
      if (!isNaN(num)) multipliers.push(num);
    });

    res.status(200).json({ multipliers });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
