import { NextRequest, NextResponse } from 'next/server';

const GHL_PIT = process.env.GHL_PIT_TOKEN!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, email, language = 'en', consent = false } = body;

    if (!email || !firstName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json({ error: 'Consent is required' }, { status: 400 });
    }

    // Create or update contact in GHL
    const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_PIT}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        firstName,
        email,
        tags: ['rapidclawagent', 'lead', language === 'es' ? 'spanish' : 'english', 'gdpr-consent-given'],
        customFields: [
          { key: 'contact.preferred_language', field_value: language },
          { key: 'contact.install_status', field_value: 'pending' },
          { key: 'contact.gdpr_consent', field_value: true },
          { key: 'contact.consent_date', field_value: new Date().toISOString() },
        ],
        source: 'rapidclawagent.com',
      }),
    });

    const ghlData = await ghlRes.json();

    if (!ghlRes.ok) {
      console.error('GHL error:', ghlData);
      return NextResponse.json({ error: 'CRM error' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      contactId: ghlData.contact?.id,
    });
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
