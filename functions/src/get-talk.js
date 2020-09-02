require('dotenv').config()
const { baseID, apiKey, tableName } = process.env
const AirtablePlus = require('airtable-plus')
const airtable = new AirtablePlus({ baseID, apiKey, tableName })
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
}

exports.handler = async (event, context) => {
    try {
        const record = await airtable.find(event.queryStringParameters.id)
        return {
            headers,
            statusCode: 200,
            body: JSON.stringify(record)
        }
    } catch (e) {
        console.error('Error', e)
        return {
            headers,
            statusCode: 500,
            body: JSON.stringify({ error: e.toString() })
        }
    }
}
