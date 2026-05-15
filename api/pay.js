export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { phone, amount, reference } = req.body;
    if (!phone || !amount) return res.status(400).json({ error: 'Phone and amount required' });

    const FLOWCASH_API_KEY = 'b88a96eb72bd145c8ab02d56b8d08d7cae9c5d1e9451b7ee002797640123af9e';
    const FLOWCASH_EMAIL = 'elishakoskey36@gmail.com';
    const FLOWCASH_ENDPOINT = 'https://flowcash.co.ke/v1/stkpush'; // ← CORRECT ENDPOINT

    try {
        const response = await fetch(FLOWCASH_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                api_key: FLOWCASH_API_KEY,
                email: FLOWCASH_EMAIL,
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
