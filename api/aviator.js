
import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://1win1.in/aviator/');
    const $ = cheerio.load(data);
    const multipliers = [];

    // TEMP: log part of HTML for debugging
    const preview = $('.recent-results').html() || $('body').html().slice(0, 500);
    console.log('HTML Preview:', preview);

    // Adjust this selector to match actual structure
    $('.recent-results span').each((_, el) => {
      const text = $(el).text().replace('x', '').trim();
      const num = parseFloat(text);
      if (!isNaN(num)) multipliers.push(num);
    });

    if (multipliers.length === 0) {
      return res.status(200).json({ error: 'No multipliers found. Check selector.' });
    }

    res.status(200).json({ multipliers });
  } catch (err) {
    console.error('Scraper error:', err);
    res.status(500).json({ error: 'Scraper crashed. Check logs or selector.' });
  }
}
