import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://1win1.in/aviator/');
    const $ = cheerio.load(data);

    // Show first 1000 characters of the page for debugging
    const preview = $('body').html()?.slice(0, 1000) || 'No HTML loaded';
    console.log('Preview:', preview);

    res.status(200).json({ message: 'Page loaded successfully', preview });
  } catch (err) {
    console.error('Scraper crashed:', err);
    res.status(500).json({ error: 'Scraper failed' });
  }
}
