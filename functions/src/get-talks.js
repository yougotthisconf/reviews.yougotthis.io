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
        const records = await airtable.read({
            view: event.queryStringParameters.reviewer
        })
        return {
            headers,
            statusCode: 200,
            body: JSON.stringify(records)
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
