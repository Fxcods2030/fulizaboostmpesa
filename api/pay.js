export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { phone, amount, reference } = req.body;
    if (!phone || !amount) return res.status(400).json({ error: 'Phone and amount required' });

     const MEGAPAY_API_KEY = 'faed2fceb9c675d79ea44a85cac380551bc620f208e9028cfb691f8592d9d46f';
     const MEGAPAY_EMAIL = 'elishakoskey36@gmail.com';
     const MEGAPAY_ENDPOINT = 'https://paywavexpress.co.ke/v1/stkpush';// ← CORRECT ENDPOINT

    try {
        const response = await fetch(MEGAPAY_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                api_key: MEGAPAY_API_KEY,
                email: MEGAPAY_EMAIL,
                amount: amount.toString(),
                msisdn: phone,
                reference: reference || 'S2'
            })
        });
        
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
