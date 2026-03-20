import { NextRequest, NextResponse } from 'next/server';

const GHL_PIT = process.env.GHL_PIT_TOKEN!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;

// Called by install.sh after successful installation
// curl -X POST https://rapidclawagent.com/api/install-complete -d '{"email":"...", "vpsProvider":"Hostinger"}'
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, vpsProvider = 'Unknown' } = body;

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    // Search for existing contact by email
    const searchRes = await fetch(
      `https://services.leadconnectorhq.com/contacts/search?locationId=${GHL_LOCATION_ID}&email=${encodeURIComponent(email)}`,
      {
        headers: {
          'Authorization': `Bearer ${GHL_PIT}`,
          'Version': '2021-07-28',
        },
      }
    );
    const searchData = await searchRes.json();
    const contactId = searchData.contacts?.[0]?.id;

    if (contactId) {
      // Update existing contact
      await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${GHL_PIT}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tags: ['install-complete'],
          customFields: [
            { key: 'contact.install_status', field_value: 'complete' },
            { key: 'contact.vps_provider', field_value: vpsProvider },
          ],
        }),
      });
    } else {
      // Create new contact (they skipped the web form)
      await fetch('https://services.leadconnectorhq.com/contacts/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_PIT}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          email,
          tags: ['rapidclawagent', 'install-complete', 'direct-install'],
          customFields: [
            { key: 'contact.install_status', field_value: 'complete' },
            { key: 'contact.vps_provider', field_value: vpsProvider },
          ],
          source: 'install.sh',
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('install-complete error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
