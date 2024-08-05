/**
 * @link https://github.com/levinunnink/html-form-to-notion
 */

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json({ error: 'Method Not Allowed' }, {
        status: 405
      })
    }

    const body = await req.json()
    const { date, name, email, message } = body
    const notionDatabaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID_MESSAGE
    const integrationToken = process.env.NEXT_PUBLIC_NOTION_TOKEN

    const url = `https://api.notion.com/v1/pages`

    const data = {
      parent: { database_id: notionDatabaseId },
      properties: {
        Date: {
          date: {
            start: date
          }
        },
        Name: { title: [{ text: { content: name } }] },
        Email: { email: email },
        Message: {
          rich_text: [
            {
              text: {
                content: message
              }
            }
          ]
        }
      }
    }

    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${integrationToken}`,
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify(data)
    })

    if (result.status !== 200) {
      const error = await result.json()
      console.error('Got error saving data', error)
      return NextResponse.json({ message: error.message }, {
        status: 500
      })
    }

    return NextResponse.json({ message: 'Data saved to Notion!' })
  } catch (error) {
    console.error(error)
    NextResponse.json({ message: 'Internal Server Error' }, {
      status: 500
    })
  }
}
