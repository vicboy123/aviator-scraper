
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://1win1.in/aviator/', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
      timeout: 10000
    });

    const htmlPreview = response.data.slice(0, 1000); // preview

    res.status(200).json({
      message: 'Fetched page successfully',
      preview: htmlPreview
    });
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({
      error: 'Failed to fetch the 1win Aviator page.',
      reason: err.message
    });
  }
}
